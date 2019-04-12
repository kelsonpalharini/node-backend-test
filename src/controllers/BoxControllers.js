const Box = require('../models/Box.js')

class BoxController {
    async store(req, res){
        
        const box = await Box.create(req.body);

        return res.json(box);
    }

    async show(req, res){
        const box = await Box.findById(req.params.id).populate({
            path: 'files',
            options: { sort: { createdAt: -1 }} //orderna pelo campo de forma decrescente
        });

        return res.json(box);
    }
}

//uso o new para retornar a instâcia da classe
module.exports = new BoxController();