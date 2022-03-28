const {
  createUser,
  deleteUser,
  getAllUsers,
  getNumberUsers,
  updateUser,
} = require("../../models/users.model");
const Response = require("../../utils/response.util");
const Upload = require("../../helpers/uploadImage.helper");
const paginate = require("../../helpers/pagination.helper");
const site = require("../../../configs/website");

/**
 *
 * @param {Request} req
 * @param {Response} res
 * @returns {JSON}
 */

const getAll = async (req, res) => {
  try {
    let datas = await getNumberUsers(req.query.search, req.query.id);
    const paging = await paginate(req.query.page, req.query.limit, datas.total);

    datas = await getAllUsers(
      paging.currentPage.limit,
      paging.currentPage.startIndex,
      req.query.sort,
      req.query.ordinal,
      req.query.search,
      req.query.id
    );

    datas.forEach((data) => {
      data.avatar = `${site}/public/avatars/${data.avatar}`;
    });

    if (datas.length <= 0) {
      return Response.notFound(res);
    }

    return Response.success(res, datas, paging);
  } catch (error) {
    return Response.error(res, error.message);
  }
};

const create = async (req, res) => {
  try {
    Upload.single("avatar")(req, res, async () => {
      let datas = req.body;
      try {
        console.log(req.file);
        if (req.file != undefined) {
          datas.avatar = req.file.path.slice(17, 100);
        }

        const result = await createUser(datas);

        return Response.success(res, result);
      } catch (error) {
        return Response.error(res, error.message);
      }
    });
  } catch (error) {
    return Response.error(res, error.message);
  }
};

const update = async (req, res) => {
  try {
    Upload.single("avatar")(req, res, async () => {
      let datas = req.body;
      try {
        console.log(req.file);
        if (req.file != undefined) {
          datas.avatar = req.file.path.slice(17, 100);
        }

        const result = await updateUser(req.params.id, datas);

        return Response.success(res, result);
      } catch (error) {
        return Response.error(res, error.message);
      }
    });
  } catch (error) {
    return Response.error(res, error.message);
  }
};

const destroy = async (req, res) => {
  try {
    await deleteUser(req.params.id);

    return Response.success(res, "Data has been deleted");
  } catch (error) {
    return Response.error(res, error.message);
  }
};

module.exports = { create, getAll, update, destroy };
