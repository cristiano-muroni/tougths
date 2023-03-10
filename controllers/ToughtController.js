const Tought = require("../models/Tought");
const User = require("../models/User");
const { Op } = require('sequelize');

module.exports = class ToughtController {

  static async showToughts(req, res) { 
    try {
      let search = '';

    if(req.query.search) {
      search = req.query.search;
    }

    let order = 'DESC';
    order = req.query.order === 'old' ? 'ASC' : 'DESC';

    const toughtsData = await Tought.findAll({
      include: User,
      where:{
        title:{ [Op.like]: `%${search}%`}
      },
      order: [['createdAt', order]],
    });    
    const toughts = toughtsData.map(result => result.get({plain: true}));

    let toughtsQty = toughts.length;
    toughtsQty = toughtsQty === 0 ? false : toughtsQty;

    res.render("toughts/home", {toughts, search, toughtsQty});
      
    } catch (error) {
      console.log(error);      
    };
  };

  static async dashboard(req, res) {
    const UserId = req.session.userid;
    console.log(`HERE: ${UserId}`);

    const user = await User.findOne({
      where: { id: UserId },
      include: Tought,
      plain: true,
    });
    const toughts = user.Toughts.map((result) => result.dataValues);

    let emptyToughts = false;
    if (toughts.length === 0) {
      emptyToughts = true;
    }
    console.log(toughts.length);

    res.render("toughts/dashboard", { toughts, emptyToughts });
    return;
  };

  static createTought(req, res) {
    res.render("toughts/create");
  };

  static async createToughtSave(req, res) {
    try {
      const tought = {
        title: req.body.title,
        UserId: req.session.userid,
      };
      await Tought.create(tought);

      req.flash("message", "pensamento criado com sucesso!");
      req.session.save(() => {
        res.redirect("/toughts/dashboard");
      });

    } catch (error) {
      console.log(error);
    }
  }

  static async removeTought(req, res) {
    try {
      const id = req.body.id;
      const UserId = req.session.userid;
      await Tought.destroy({ where: { id: id, userId: UserId } });

      req.flash("message", "Pensamento removido com sucesso");

      req.session.save(() => {
        res.redirect("/toughts/dashboard");
      });
    } catch (error) {
      console.log(error);
    };
  };

  static async uptadeTought(req, res) {
    try {
      const id = req.params.id;
      const tought = await Tought.findOne({ where: { id: id }, raw: true });
      res.render("toughts/edit", { tought });

    } catch (error) {
      console.log(error);
    };
  };

  static async uptadeToughtSave(req, res) {
    try {
      const id = req.body.id;
      const tought = {
        title: req.body.title,
      };
      await Tought.update(tought, { where: { id: id } });

      req.flash("message", "Pensamento atualizado com sucesso");
      req.session.save(() => {
        res.redirect("/toughts/dashboard");
      });

    } catch (error) {
      console.log(error);
    };
  };
};
