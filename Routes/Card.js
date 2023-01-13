const {Router} = require('express');
const ModelsCard = require('../Models/Cards');


const router = Router();


router.post('/API/Add', async (req, res) => {
    const {Title, Subtitle, fileFollder, Price, Descer, types, Weight, Like} = req.body; 

    const card = new ModelsCard({
        Title,
        Subtitle,
        fileFollder,
        Price,
        Descer,
        types,
        Weight,
        Like
    })

    await card.save();
    res.status(200).json({masenge: 'Товар добавлино'})
})



router.get('/API/GET', async (req, res) => {
    const data = await ModelsCard.find({})
    res.status(200).json({cards: data});
})


router.post('/API/SEARCH', async (req, res) => {
    const {Title} = req.body;
    const candidate = await ModelsCard.find({ Title })
    if(candidate.length <= 0) {
       return res.status(404).json({masenge: 'Товар не знайдено'})
    } 
    res.status(200).json({data: candidate});
});


router.get('/API/GETBOX', async (req, res) => {
    const candidate = await ModelsCard.find({ types: 'box' })
    if(candidate.length <= 0) {
       return res.status(500).json({masenge: 'Сталася помилка'})
    } 
    res.status(200).json({data: candidate});
})

router.post('/API/LIKE', async (req, res) => {
    const {_id} = req.body;
    const candidate = await ModelsCard.findOne({ _id });
    const newLike = candidate.Like
    candidate.Like = newLike + 1

    await candidate.save();
    res.status(200)
})

router.post('/API/ITEM', async (req, res) => {
    const {_id} = req.body;
    

    const dataItem = await ModelsCard.findOne({ _id })
    res.status(200).json({
        data: dataItem,
    })

})

module.exports = router