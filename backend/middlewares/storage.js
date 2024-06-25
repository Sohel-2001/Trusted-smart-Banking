import multer from "multer";

// import {} from "../../client/src/images/"


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "")
      cb(null, "../../../cllg proj/login_react/client/src/images/")
    //   cb(null, "./uploads/")
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() ;
      cb(null, uniqueSuffix + file.originalname)
    }
  })
  
  export const upload = multer({ storage: storage });