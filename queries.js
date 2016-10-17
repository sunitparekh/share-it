db.customers.insertOne({"name":"Sunit Parekh","dateOfBirth": new ISODate("1977-08-07"), "email":"parkeh.sunit@gmail.com"});


mongoimport --db store --collection customers customers.json --jsonArray --upsert
mongoimport --db store --collection pictures pictures.json --jsonArray --upsert


db.getCollection('customers').find({"storeCredits": { $gt: 500 } })
db.customers.find( { "gender" : "Male", "storeCredits" : { $gt: 1000 } } )   
db.customers.find( { $or: [ {"gender" : 'Female'}, {"storeCredits" : { $gt: 1000 } }]})
db.customers.count( { "email" : "parekh.sunit@gmail.com" } );




db.customers.find({pictures: { $exists: true }}).forEach( function(doc) {
    // get active picture id
    var pictures = doc.pictures.filter(function(pic) { return pic.active == true })
    if (pictures.length > 0) {
        printjson(pictures[0]);
        var pictureId = pictures[0].pictureId;
        print("pictureId: " + pictureId);
        // get picture name from pictureId
        var picName = db.pictures.findOne( {_id:  pictureId}).filename ;
        print("picName: " + picName);
        // print final output
        print('"' + doc.name + '","' + doc.email + '","' + picName + '"');
    }
});




db.customers.find({pictures: { $exists: true }, "pictures.active" : true}).forEach( function(doc) {
    // get active picture id
    var pictures = doc.pictures.filter(function(pic) { return pic.active == true })
    printjson(pictures[0]);
    var pictureId = pictures[0].pictureId;
    print("pictureId: " + pictureId);
    // get picture name from pictureId
    var picName = db.pictures.findOne( {_id:  pictureId}).filename ;
    print("picName: " + picName);
    // print final output
    print('"' + doc.name + '","' + doc.email + '","' + picName + '"');
});