const HomePage2 = require('../models/homePage2');
const mongoose = require('mongoose');
const fs = require("fs");
const PATH = require("path");
const { deleteImageFromServer } = require('../modules/services/imageService');
const { JsonWebTokenError } = require('jsonwebtoken');

//a képet így lehet elérni: http://localhost:8081/uploads/1620145209368sky.jpg

exports.homePage2_get = (req, res, next) => {
    HomePage2.findOne()
        .select('-_v')
        .exec()
        .then((homePage) => {
            if (!homePage) {
                return res.status(404).json({
                    message: 'Home page not found',
                });
            }
            res.status(200).json(homePage);
        })
        .catch((err) => {
            res.status(500).json({
                Error:  err.message,
            });
        });
};


exports.homePage2_create = (req, res, next) => {
    console.log(req.body)
    HomePage2.find()
        .exec()
        .then((docs) => {
            if (docs.length > 0) {
                res.status(404).json({
                    message:
                        "csak egy home page lehetséges, ha már van egy, akkor csak módosítani lehet.",
                });
            } else {
                try {
                    const homePage = new HomePage2({
                        _id: new mongoose.Types.ObjectId(),
                        Title: {
                            titleDescription: req.body.Title,
                            titleImagePath: req.file.path
                        },
                        Heading: {
                            headingDescription: req.body.Heading,
                        },
                        Introduction: {
                            introductionDescription: req.body.Introduction,
                        },
                        Section_1: {
                            section_1Description: req.body.Section_1,
                        },
                        Section_2: {
                            section_2Description: req.body.Section_2,
                        },
                        Section_3: {
                            section_3Description: req.body.Section_3,
                        },
                        Section_4: {
                            section_4Description: req.body.Section_4,
                        },
                        Section_5: {
                            section_5Description: req.body.Section_5,
                        },
                        Section_6: {
                            section_6Description: req.body.Section_6,
                        },
                    });
                    homePage
                        .save()
                        .then((result) => {
                            console.log(result);
                            res.status(201).json({
                                message: "Created new HomePage successfully!",
                                request: {
                                    type: "GET",
                                    url: "http://localhost:8081/home",
                                },
                            },
                            );
                        }).catch((err) => {
                            throw new ErrorÍ(error)
                        })

                } catch (error) {
                    throw new Error(error)
                }
            }
        }).catch((err) => {
            res.status(500).json({
                Error: err.message,
            });
        })
}

exports.homePage2_TitleChange = (req, res, next) => {
    let oldImage = null
    HomePage2.findOne()
        .select('-_v')
        .exec()
        .then((homePage) => {
            if (!homePage) {
                return res.status(404).json({
                    message: 'Home page not found',
                });
            }
            const id = homePage._id.toString();
            let updateOps = { Title: { titleDescription: homePage.Title.titleDescription, titleImagePath: homePage.Title.titleImagePath } }
            if (req.file) {
                oldImage = homePage.Title.titleImagePath
                updateOps.Title.titleImagePath = req.file.path
            }
            if (req.body.Title) {
                updateOps.Title.titleDescription = req.body.Title
            }
            HomePage2.updateOne({ _id: id }, { $set: updateOps })
                .exec()
                .then(() => {
                    if (oldImage) {
                        deleteImageFromServer(oldImage)
                    }
                    res.status(200).json({
                        message: 'Home page Title is updated',
                    })
                }).catch((err) => {
                    throw new Error(err)
                })
        })
        .catch((err) => {
            res.status(500).json({
                Error:  err.message,
            });
        });
};

exports.homePage2_HeadingChange = (req, res, next) => {
    let oldImage = null
    HomePage2.findOne()
        .select('-_v')
        .exec()
        .then((homePage) => {
            const id = homePage._id.toString();
            if (!homePage) {
                return res.status(404).json({
                    message: 'Home page not found',
                });
            }
            let updateOps = { Heading: {headingTitle: homePage.Heading.headingTitle, headingDescription: homePage.Heading.headingDescription, headingImagePath: homePage.Heading.headingImagePath } }
            if (req.file) {
                oldImage = homePage.Heading.headingImagePath
                updateOps.Heading.headingImagePath = req.file.path
            }
            if (req.body.headingDescription) {
                updateOps.Heading.headingDescription = req.body.headingDescription
            }
            if (req.body.headingTitle) {
                updateOps.Heading.headingTitle = req.body.headingTitle
            }
            HomePage2.updateOne({ _id: id }, { $set: updateOps })
                .exec()
                .then(() => {
                    if (oldImage) {
                        deleteImageFromServer(oldImage)
                    }
                    res.status(200).json({
                        message: 'Home page heading is updated',
                    })
                }).catch((err) => {
                    throw new Error(err)
                })
        })
        .catch((err) => {
            res.status(500).json({
                Error: err.message,
            });
        });
};

exports.homePage2_IntroductionChange = (req, res, next) => {
    let oldImage = null
    HomePage2.findOne()
        .select('-_v')
        .exec()
        .then((homePage) => {
            const id = homePage._id.toString();
            if (!homePage) {
                return res.status(404).json({
                    message: 'Home page not found',
                });
            }
            let updateOps = { Introduction: {IntroductionTitle: homePage.Introduction.IntroductionTitle, introductionDescription: homePage.Introduction.introductionDescription, introductionImagePath: homePage.Introduction.introductionImagePath } }
            if (req.file) {
                oldImage = homePage.Introduction.introductionImagePath
                updateOps.Introduction.introductionImagePath = req.file.path
            }
            if (req.body.introductionDescription) {
                updateOps.Introduction.introductionDescription = req.body.introductionDescription
            }
            if (req.body.IntroductionTitle) {
                updateOps.Introduction.IntroductionTitle = req.body.IntroductionTitle
            }
            HomePage2.updateOne({ _id: id }, { $set: updateOps })
                .exec()
                .then(() => {
                    if (oldImage) {
                        deleteImageFromServer(oldImage)
                    }
                    res.status(200).json({
                        message: 'Home page Introduction is updated',
                    })
                }).catch((err) => {
                    throw new Error(err)
                })
        })
        .catch((err) => {
            res.status(500).json({
                Error: err.message,
            });
        });
};

exports.homePage2_Section_1Change = (req, res, next) => {
    let oldImage = null
    HomePage2.findOne()
        .select('-_v')
        .exec()
        .then((homePage) => {
            const id = homePage._id.toString();
            if (!homePage) {
                return res.status(404).json({
                    message: 'Home page not found',
                });
            }
            let updateOps = { Section_1: {section_1Title: homePage.Section_1.section_1Title, section_1Description: homePage.Section_1.section_1Description, section_1ImagePath: homePage.Section_1.section_1ImagePath } }
            if (req.file) {
                oldImage = homePage.Section_1.section_1ImagePath
                updateOps.Section_1.section_1ImagePath = req.file.path
            }
            if (req.body.section_1Description) {
                updateOps.Section_1.section_1Description = req.body.section_1Description
            }
            if (req.body.section_1Title) {
                updateOps.Section_1.section_1Title = req.body.section_1Title
            }
            HomePage2.updateOne({ _id: id }, { $set: updateOps })
                .exec()
                .then(() => {
                    if (oldImage) {
                        deleteImageFromServer(oldImage)
                    }
                    res.status(200).json({
                        message: 'Home page Section_1 is updated',
                    })
                }).catch((err) => {
                    throw new Error(err)
                })
        })
        .catch((err) => {
            res.status(500).json({
                Error: err.message,
            });
        });
};

exports.homePage2_Section_2Change = (req, res, next) => {
    let oldImage = null
    HomePage2.findOne()
        .select('-_v')
        .exec()
        .then((homePage) => {
            const id = homePage._id.toString();
            if (!homePage) {
                return res.status(404).json({
                    message: 'Home page not found',
                });
            }
            let updateOps = { Section_2: {section_2Title: homePage.Section_2.section_2Title, section_2Description: homePage.Section_2.section_2Description, section_2ImagePath: homePage.Section_2.section_2ImagePath } }
            if (req.file) {
                oldImage = homePage.Section_2.section_2ImagePath
                updateOps.Section_2.section_2ImagePath = req.file.path
            }
            if (req.body.section_2Description) {
                updateOps.Section_2.section_2Description = req.body.section_2Description
            }
            if (req.body.section_2Title) {
                updateOps.Section_2.section_2Title = req.body.section_2Title
            }
            HomePage2.updateOne({ _id: id }, { $set: updateOps })
                .exec()
                .then(() => {
                    if (oldImage) {
                        deleteImageFromServer(oldImage)
                    }
                    res.status(200).json({
                        message: 'Home page Section_2 is updated',
                    })
                }).catch((err) => {
                    throw new Error(err)
                })
        })
        .catch((err) => {
            res.status(500).json({
                Error: err.message,
            });
        });
};

exports.homePage2_Section_3Change = (req, res, next) => {
    let oldImage = null
    HomePage2.findOne()
        .select('-_v')
        .exec()
        .then((homePage) => {
            const id = homePage._id.toString();
            if (!homePage) {
                return res.status(404).json({
                    message: 'Home page not found',
                });
            }
            let updateOps = { Section_3: {section_3Title: homePage.Section_3.section_3Title, section_3Description: homePage.Section_3.section_3Description, section_3ImagePath: homePage.Section_3.section_3ImagePath } }
            if (req.file) {
                oldImage = homePage.Section_3.section_3ImagePath
                updateOps.Section_3.section_3ImagePath = req.file.path
            }
            if (req.body.section_3Description) {
                updateOps.Section_3.section_3Description = req.body.section_3Description
            }
            if (req.body.section_3Title) {
                updateOps.Section_3.section_3Title = req.body.section_3Title
            }
            HomePage2.updateOne({ _id: id }, { $set: updateOps })
                .exec()
                .then(() => {
                    if (oldImage) {
                        deleteImageFromServer(oldImage)
                    }
                    res.status(200).json({
                        message: 'Home page Section_3 is updated',
                    })
                }).catch((err) => {
                    throw new Error(err)
                })
        })
        .catch((err) => {
            res.status(500).json({
                Error: err.message,
            });
        });
};

exports.homePage2_Section_4Change = (req, res, next) => {
    let oldImage = null
    HomePage2.findOne()
        .select('-_v')
        .exec()
        .then((homePage) => {
            const id = homePage._id.toString();
            if (!homePage) {
                return res.status(404).json({
                    message: 'Home page not found',
                });
            }
            let updateOps = { Section_4: {section_4Title: homePage.Section_4.section_4Title, section_4Description: homePage.Section_4.section_4Description, section_4ImagePath: homePage.Section_4.section_4ImagePath } }
            if (req.file) {
                oldImage = homePage.Section_4.section_4ImagePath
                updateOps.Section_4.section_4ImagePath = req.file.path
            }
            if (req.body.section_4Description) {
                updateOps.Section_4.section_4Description = req.body.section_4Description
            }
            if (req.body.section_4Title) {
                updateOps.Section_4.section_4Title = req.body.section_4Title
            }
            HomePage2.updateOne({ _id: id }, { $set: updateOps })
                .exec()
                .then(() => {
                    if (oldImage) {
                        deleteImageFromServer(oldImage)
                    }
                    res.status(200).json({
                        message: 'Home page Section_4 is updated',
                    })
                }).catch((err) => {
                    throw new Error(err)
                })
        })
        .catch((err) => {
            res.status(500).json({
                Error: err.message,
            });
        });
};

exports.homePage2_Section_5Change = (req, res, next) => {
    let oldImage = null
    HomePage2.findOne()
        .select('-_v')
        .exec()
        .then((homePage) => {
            const id = homePage._id.toString();
            if (!homePage) {
                return res.status(404).json({
                    message: 'Home page not found',
                });
            }
            let updateOps = { Section_5: {section_5Title: homePage.Section_5.section_5Title, section_5Description: homePage.Section_5.section_5Description, section_5ImagePath: homePage.Section_5.section_5ImagePath } }
            if (req.file) {
                oldImage = homePage.Section_5.section_5ImagePath
                updateOps.Section_5.section_5ImagePath = req.file.path
            }
            if (req.body.section_5Description) {
                updateOps.Section_5.section_5Description = req.body.section_5Description
            }
            if (req.body.section_5Title) {
                updateOps.Section_5.section_5Title = req.body.section_5Title
            }
            HomePage2.updateOne({ _id: id }, { $set: updateOps })
                .exec()
                .then(() => {
                    if (oldImage) {
                        deleteImageFromServer(oldImage)
                    }
                    res.status(200).json({
                        message: 'Home page Section_5 is updated',
                    })
                }).catch((err) => {
                    throw new Error(err)
                })
        })
        .catch((err) => {
            res.status(500).json({
                Error: err.message,
            });
        });
};

exports.homePage2_Section_6Change = (req, res, next) => {
    let oldImage = null
    HomePage2.findOne()
        .select('-_v')
        .exec()
        .then((homePage) => {
            const id = homePage._id.toString();
            if (!homePage) {
                return res.status(404).json({
                    message: 'Home page not found',
                });
            }
            let updateOps = { Section_6: {section_6Title: homePage.Section_6.section_6Title, section_6Description: homePage.Section_6.section_6Description, section_6ImagePath: homePage.Section_6.section_6ImagePath } }
            if (req.file) {
                oldImage = homePage.Section_6.section_6ImagePath
                updateOps.Section_6.section_6ImagePath = req.file.path
            }
            if (req.body.section_6Description) {
                updateOps.Section_6.section_6Description = req.body.section_6Description
            }
            if (req.body.section_6Title) {
                updateOps.Section_6.section_6Title = req.body.section_6Title
            }
            HomePage2.updateOne({ _id: id }, { $set: updateOps })
                .exec()
                .then(() => {
                    if (oldImage) {
                        deleteImageFromServer(oldImage)
                    }
                    res.status(200).json({
                        message: 'Home page Section_6 is updated',
                    })
                }).catch((err) => {
                    throw new Error(err)
                })
        })
        .catch((err) => {
            res.status(500).json({
                Error: err.message,
            });
        });
};

