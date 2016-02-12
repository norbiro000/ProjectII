var Place = require('../models/myplace.js');

module.exports = function (socket) {
    // var objToJson = { 
    //     placename:"Tiger Kingdom" ,
    //     price:[{
    //         netprice:"120",
    //         maxprice:"900"
    //     }
    //     ],
    //     contents : [
    //         { 
    //             image : "dist/imgs/test.jpg",
    //             title : "Tiger Kingdoms",
    //             description : "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?",
    //         }
    //     ],
    //     address : [
    //     {
    //         telephone : "076-123321",
    //         email : "tigerkingdom@gmail.com",
    //         fax : "076123322",
    //         province : "phuket",
    //         address : "130/103 V.7 Kathu Kathu Phuket 83120",
    //     }
    //     ]
    // };

    // var stream = new Place(objToJson);
    // stream.save(function( err){
    //     if (err) {
    //     return err;
    //     }
    //     else {
    //         console.log("Post saved");
    //     }
    // });
    
    Place.find({ placename : "Tiger Kingdom"}, function( err, count){
        module.exports = JSON.stringify(count);
    });
};