import Map2 from './map2'

export const create = () => ({
  order: [],
  versions: new Map2(),
})

export const findIndex = (list, index, agentId) =>
  list.order.findIndex(
    ([index2, agentId2]) => index2 === index && agentId2 === agentId
  )

export const includes = (list, index, agentId) =>
  list.versions.has(index, agentId)

export const getInsertIndex = (list, index, agentId) =>
  list.order.findIndex(
    ([index2, agentId2]) => index2 <= index && agentId2 < agentId
  )
 
export const insert = (list, insertIndex, index, agentId, seq = 0) => {
  list.order.splice(insertIndex, 0, [index, agentId])
  list.versions.set(index, agentId, seq)
}

export const shouldReplace = (list, index, agentId, seq) => {
  const seq2 = list.versions.get(index, agentId)
  return seq2 !== undefined && seq > seq2
}

export const replace = (list, index, agentId, seq) => {
  list.versions.set(index, agentId, seq)
}

export const remove = (list, insertIndex, index, agentId, seq) => {
  list.order.splice(insertIndex, 1)
  list.versions.set(index, agentId, seq)
}

export const merge = (list1, list2) => {
  for (const [index, agentId] of list2.order) {
    if (includes(list1, index, agentId)) {
      const seq = list2.versions.get(index, agentId)
      if (shouldReplace(list1, index, agentId, seq)) {
        replace(list1, index, agentId, seq)
      }
    } else {
      const insertIndex = getInsertIndex(list1, index, agentId)
      insert(list1, insertIndex, index, agentId, seq)
    }
  }
  return list1
}
