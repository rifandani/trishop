// report typeId
// typeId = 1 // 'Bug or problem with the website'
// typeId = 2 // 'Spam or commercial unrelated to trishop'
// typeId = 3 // 'Contains offensive or inappropriate content'

import { Schema } from 'mongoose'

const report = {
  reviewRef: Schema.Types.ObjectId, // review
  reporter: '@user-id', // reporter
  argument: 'Comment ini mengandung sara',
  typeId: 2,
  createdAt: '2020-11-06T09:21:15.364+00:00',
}

export default report
