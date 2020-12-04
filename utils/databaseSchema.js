// users document
export const users = [
  {
    name: 'rifandani',
    email: 'rifandani@gmail.com',
    password: '$2b$10$2lk/vNyRaFaholLrM2hfS.LVcVaWb8xaQ1JG7kxFLQl5teuZUx3X2',
    role: 'ADMIN',
    createdAt: '2020-11-06T09:21:15.364+00:00',
    updatedAt: '2020-11-06T09:21:15.364+00:00',
    // firebase storage
    // photoURL: 'users/userId/fotoprofil.png',
  },
];

// products document
export const products = [
  {
    title: 'Xiaomi Redmi Note 4',
    stock: 12,
    desc: 'My first xiaomi phone',
    labels: ['electronics', 'smartphone'],
    // images dari storage firebase
    images: [
      {
        imageName: 'product.png',
        imageUrl: 'images/product.png',
      },
    ],
  },
];

// storageRef.put(images[i]).on(
//   'state_changed',
//   (snap: any) => {
//     // track the upload progress
//     const percentage = Math.round(
//       (snap.bytesTransferred / snap.totalBytes) * 100,
//     );
//     console.log(percentage + '% transfer');
//   },
//   (err: any) => {
//     if (err) console.error('firebase storage upload error');
//   },
//   async () => {
//     // get the public download img url
//     const url = await storageRef.getDownloadURL();

//     // push ke array imagesMongo
//     url &&
//       imagesMongo.push({
//         imageName: images[i].name,
//         imageUrl: url,
//       });

//     // save ke MONGODB, hanya ketika sudah upload semua image
//     if (i === images.length - 1) {
//       Axios.post('http://localhost:3000/api/admin/products', {
//         title,
//         stock,
//         desc,
//         labels,
//         images: imagesMongo,
//       })
//         .then(() => {
//           toast.success('Product created 👍', {
//             ...options,
//             position: 'bottom-left',
//           });

//           push(`/admin/dashboard?_id=${userId}`);
//         })
//         .catch((err) =>
//           toast.error(err.message, {
//             ...options,
//             position: 'bottom-left',
//           }),
//         );
//     }
//   },
// );
