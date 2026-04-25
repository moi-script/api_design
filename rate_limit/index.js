

async function spam() {
    // const request = new Promise(async (res, rej) => {
    //     try {
    //         res(await fetch('http://localhost:3000/api/items'))
    //     } catch (err) {
    //         rej(err)
    //     }
    // })

    // const promises = Array.from({ length: 300 }, () => request)

    // console.log(promises);

    // for await(const req of promises) {
    //     const res = req
    //     console.log("res --> ", res.data);
    // }


    // for(let i =0; i<promises.length; i++) {
    //     promises[i].then(res => {
    //         console.log('res --> ', res);
    //     }).catch(err => console.error(err));
    // }

    for(let i=0; i<300; i++) {
        const  res  =  await fetch('http://localhost:3000/api/items');

        const data = await res.json();

        console.log("Data  --> ", data);
    }
}
spam()