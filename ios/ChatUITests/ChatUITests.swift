//
//  ChatUITests.swift
//  ChatUITests
//
//  Created by Pavlo Aksonov on 21.01.16.
//  Copyright © 2016 Facebook. All rights reserved.
//

import XCTest

extension XCUIElement {
  /**
   Removes any current text in the field before typing in the new value
   - Parameter text: the text to enter into the field
   */
  func clearAndEnterText(text: String) -> Void {
    guard let stringValue = self.value as? String else {
      XCTFail("Tried to clear and enter text into a non string value")
      return
    }
    
    self.tap()
    
    var deleteString: String = ""
    for _ in stringValue.characters {
      deleteString += "\u{8}"
    }
    self.typeText(deleteString)
    
    self.typeText(text)
  }
}

class ChatUITests: XCTestCase {
  
    override func setUp() {
        super.setUp()
        
        // Put setup code here. This method is called before the invocation of each test method in the class.
        
        // In UI tests it is usually best to stop immediately when a failure occurs.
        continueAfterFailure = false
        // UI tests must launch the application that they test. Doing this in setup will make sure it happens for each test method.
        let app = XCUIApplication()
        app.launchEnvironment["TESTING"] = "1";
        app.launch()

        // In UI tests it’s important to set the initial state - such as interface orientation - required for your tests before they run. The setUp method is a good place to do this.
    }
    
    override func tearDown() {
        // Put teardown code here. This method is called after the invocation of each test method in the class.
        super.tearDown()
    }
    
    func testSignIn() {
      let app = XCUIApplication()
      
      
      let signIn = app.otherElements[" Sign In"]
      let exists = NSPredicate(format: "exists == true")
      expectationForPredicate(exists, evaluatedWithObject: signIn, handler: nil)
      waitForExpectationsWithTimeout(300, handler: nil)
      signIn.tap()
      
      let username = app.textFields["handle"]
      expectationForPredicate(exists, evaluatedWithObject: username, handler: nil)
      waitForExpectationsWithTimeout(30, handler: nil)
      XCTAssert(username.exists)
      username.tap()
      username.clearAndEnterText("testUser1")

      let firstName = app.textFields["firstName"]
      XCTAssert(firstName.exists)
      firstName.tap()
      firstName.typeText("John")
      
      let lastName = app.textFields["lastName"]
      XCTAssert(lastName.exists)
      lastName.tap()
      lastName.typeText("Smith")
      
      let email = app.textFields["email"]
      XCTAssert(email.exists)
      email.tap()
      email.typeText("email@test.com")
      
      let submit = app.otherElements[" Continue"]
      XCTAssert(email.exists)
      submit.tap()
      
      
      let leftNav = app.otherElements["leftNavButton"]
      expectationForPredicate(exists, evaluatedWithObject: leftNav, handler: nil)
      waitForExpectationsWithTimeout(30, handler: nil)
      leftNav.tap()
      
      let profileBtn = app.otherElements["     J   John Smith View Account"]
      expectationForPredicate(exists, evaluatedWithObject: profileBtn, handler: nil)
      waitForExpectationsWithTimeout(30, handler: nil)
      XCTAssert(profileBtn.exists)
      
//      let profileTitle = app.otherElements["     J   John Smith View Account"]
//      XCTAssert(profileTitle.exists)
//      
      profileBtn.tap()
      let title = app.staticTexts["My Account"];
      expectationForPredicate(exists, evaluatedWithObject: title, handler: nil)
      waitForExpectationsWithTimeout(30, handler: nil)
      
      }
  
}
