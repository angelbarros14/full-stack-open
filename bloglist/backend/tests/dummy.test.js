// const { test, describe } = require('node:test')
// const assert = require('node:assert')
// const listHelper = require('../utils/list_helper')

// describe('dummy', () => {
//     test('dummy returns one', () => {
//         const blogs = []
      
//         const result = listHelper.dummy(blogs)
//         assert.strictEqual(result, 1)
//       })
// })

// describe('blogs', () => {
//     const blogs = [
//         {
//             _id: "5a422aa71b54a676234d17f8",
//             title: "Go To Statement Considered Harmful",
//             author: "Edsger W. Dijkstra",
//             url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
//             likes: 5,
//             __v: 0
//         },
//         {
//             _id: "5a422b3a1b54a676234d17f9",
//             title: "Canonical string reduction",
//             author: "Edsger W. Dijkstra",
//             url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
//             likes: 12,
//             __v: 0
//           },
//           {
//             _id: "5a422b3a1b54a676234d17f0",
//             title: "A",
//             author: "Edsger W. Dijkstra",
//             url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
//             likes: 18,
//             __v: 0
//           },
//     ]

//     test('returns total likes', () => {
//         assert.strictEqual(listHelper.totalLikes(blogs), 35)
//     })
//     test('returns favorite blog', () => {
//         assert.strictEqual(listHelper.favoriteBlog(blogs), "A")
//     })
// })
