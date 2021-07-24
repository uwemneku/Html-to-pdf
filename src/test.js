function arraysEqual(oldArr, newArray) {
    const test = new Set([...oldArr, ...newArray])
    return test.size === oldArr.length
  }

  console.log(arraysEqual([2, 5, 3], [1, 5, 3])) // true
  