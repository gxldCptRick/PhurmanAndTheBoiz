import chai from "chai";
import  * as Api from "./ApiService";
import mocha from "mocha";
import { LocalStorage } from "node-localstorage";
global.localStorage = new LocalStorage("./yes");
const should = chai.should();
describe("API Functions Correctly", function() {
  describe("Get Function Works Correctly For Each Resource", function() {
    it("Response Should not be null for Users", function(done) {
      this.timeout(4000);
      Api.GetResource(Api.Resource.Users)
        .then(response => response.json())
        .then(function(json) {
          should.exist(json);
        })
        .then(() => done())
        .catch(err => {
          console.log(err);
          done(err);
        });
    });

    it("Response Should not be null for Items", function(done) {
      this.timeout(4000);
      Api.GetResource(Api.Resource.Items)
        .then(response => response.json())
        .then(function(json) {
          should.exist(json);
        })
        .then(() => done())
        .catch(err => {
          console.log(err);
          done(err);
        });
    });

    it("Response Should not be null for Characters", function(done) {
      this.timeout(4000);
      Api.GetResource(Api.Resource.Characters)
        .then(response => response.json())
        .then(function(json) {
          should.exist(json);
        })
        .then(() => done())
        .catch(err => {
          console.log(err);
          done(err);
        });
    });

    it("Response Should not be null for Maps", function(done) {
      this.timeout(4000);
      Api.GetResource(Api.Resource.Maps)
        .then(response => response.json())
        .then(function(json) {
          should.exist(json);
        })
        .then(() => done())
        .catch(err => {
          console.log(err);
          done(err);
        });
    });
  });

  describe("Speicial Fuctions Work Correctly", function() {
    it("Login Should Have Token On Success", function(done) {
      this.timeout(4000);
      Api.LoginUser({ username: "The Batman", password: "Milo@Is3Great" })
        .then(function(json) {
          should.exist(json.token);
        })
        .then(() => done())
        .catch(err => done(err));
    });
  });

  describe("Post To Resources Works", function() {
    it("Maps Should allow post to maps when logged in", function(done) {
      this.timeout(4000);
      Api.PostToResource(Api.Resource.Maps, { im: "a map"})
      .then(response => response.json())
      .then(function(json){
        should.exist(json);
      }).then(() => done())
      .catch(err => done(err));
    });
  });
});
