const express = require('express');
const router = express();
const stateControler = require("../controlers/stateControler");

//get all states route
router.route("/").get(stateControler.GetAllStates);

//get spicific state route
router.route("/:code").get(stateControler.GetState);

router.route("/:code/capital").get(stateControler.GetStateCapital);

router.route("/:code/nickname").get(stateControler.GetStateNickname);

router.route("/:code/population").get(stateControler.GetStatePopulation);

router.route("/:code/admission").get(stateControler.GetStateAdmission);

//not done
router.route("/contig").get(stateControler.GetStatesContiguous);

//FUN facts
router.route("/:code/funfact").get(stateControler.GetFunfact);

router.route("/:code/funfact").post(stateControler.PostFunfact);

router.route("/:code/funfact").patch(stateControler.PatchFunfact);


module.exports = router;