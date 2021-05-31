// report typeId
// typeId = 1 // 'Suspected scammer'
// typeId = 2 // 'Contains incorrect information'
// typeId = 3 // 'Bug or problem with the website'
// typeId = 4 // 'Spam or commercial unrelated to roompy'
// typeId = 5 // 'Contains offensive or inappropriate content'

const report = {
  typeId: 2,
  from: '@user-id', // reporter
  to: '@review-comment-id', // review comment
  desc: 'Saya kira budget dan nomor HP dari roompies ini sangat tidak masuk akal',
  createdAt: '2020-11-06T09:21:15.364+00:00',
}

export default report
