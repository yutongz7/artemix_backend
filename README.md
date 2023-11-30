# Artemix Backend

## Note:
- If `config/secrets.js` file not work might need to create one from `config/secrets_example.js` with different userName and password
- `npm install` first and `npm start` then the backend would run on `localhost: 4000`
- If there is a connection error: check whether the IP address on [MongoDB](https://cloud.mongodb.com/v2/655b0f03fa0fe43ab04e9a62#/overview) is right and whether the server is runing

## TODO:
- Edit the schema in models if you have better idea
- If you want to test, could create a json file follow the specific schema and insert into database by `makeUpDataTest.ipynb`.

## Notes for post data
- Way to add: `insert document` button on website
- Put all the images in `./images` folder 
- Information required:
  - User table:
    - userId: `String`, e.g. `user_1`
    - userName: `String`,
    - userPassword: `String`,
    - userEmail: `String`,
    - userPhone: `Number`,
    - userProfileImgAddress: `String`, relative address of the image
    - userPreferenceTags: {type: [String], default: []}, eg. [painting, art]
    - tags: {type: [String], default: []}, eg. [writer, photographer]
  - Art table:
    - artID: Could ignore currently using `_id` for this field, type as object
    - userId: String, should by same as the userId in user table
    - userName: String, should by same as the userName in user table
    - artTitle: String,
    - artContent: String,
    - artAddress: String, relative address of the image
    - artTags: {type: [String], default: []}, eg. [painting, art]
    - width: Number, the width of the image
    - height: Number, the height of the image
  - Comment table:
    - commentId: String, e.g. `comment_1`
    - commentFromUserId: String, should by same as the userId in user table
    - commentToArtId: String, should by same as the artID in art table
    - commentContent: String,
  - Tag table:
    - tagName: String,
    - artAddresses: {type: [String], default: []}, e.g. ['./images/image_1', './images/image_2']
  - Like table:
    - likeId: String, e.g. `like_1`
    - likeFromUserId: String, should by same as the userId in user table
    - likedArtIds: {type: [String], default: []},
    - artistIdToLikeArts: {
        type: Map,
        of: [String],
        default: {},
    }, e.g. {artist1: [art1, art2], artist2: [art2, art3]}