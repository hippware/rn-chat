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
  
  func displayed() -> Bool {
    guard self.exists && !CGRectIsEmpty(frame) else { return false }
    return CGRectContainsRect(XCUIApplication().windows.elementBoundByIndex(0).frame, frame)
  }
  
  func scrollDownUntilVisible(element: XCUIElement) {
    while !element.displayed() {
      swipeDown()
    }
  }
  
  func scrollUpUntilVisible(element: XCUIElement) {
    while !element.displayed() {
      swipeUp()
    }
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
      addUIInterruptionMonitorWithDescription("Location Dialog") { (alert) -> Bool in
        let button = alert.buttons["Allow"]
        if button.exists {
          button.tap()
          return true
        }
        return false
      }
      
      
      app.tap() // need to interact with the app for the handler to fire
      
      let exists = NSPredicate(format: "exists == true")

      
      let signIn = app.otherElements[" Sign In"]
      expectationForPredicate(exists, evaluatedWithObject: signIn, handler: nil)
      waitForExpectationsWithTimeout(500, handler: nil)
      signIn.tap()
      
      
      let username = app.textFields["handle"]
      expectationForPredicate(exists, evaluatedWithObject: username, handler: nil)
      waitForExpectationsWithTimeout(30, handler: nil)
      XCTAssert(username.exists)
      username.tap()
      username.clearAndEnterText("testUser1")

      let firstName = app.textFields["firstName"]
      expectationForPredicate(exists, evaluatedWithObject: firstName, handler: nil)
      waitForExpectationsWithTimeout(30, handler: nil)
      XCTAssert(firstName.exists)
      firstName.tap()
      firstName.typeText("John")
      
      let lastName = app.textFields["lastName"]
      expectationForPredicate(exists, evaluatedWithObject: lastName, handler: nil)
      waitForExpectationsWithTimeout(30, handler: nil)
      XCTAssert(lastName.exists)
      lastName.tap()
      lastName.typeText("Smith")
      
//      let email = app.textFields["email"]
//      expectationForPredicate(exists, evaluatedWithObject: email, handler: nil)
//      waitForExpectationsWithTimeout(30, handler: nil)
//      XCTAssert(email.exists)
//      email.tap()
//      email.typeText("email@test.com")
//      
      let submit = app.otherElements[" Continue"]
      expectationForPredicate(exists, evaluatedWithObject: submit, handler: nil)
      waitForExpectationsWithTimeout(30, handler: nil)
      XCTAssert(submit.exists)
      submit.tap()
      
      // test messages screen
      let rightNav = app.otherElements["rightNavButton"]
      expectationForPredicate(exists, evaluatedWithObject: rightNav, handler: nil)
      waitForExpectationsWithTimeout(10, handler: nil)
      rightNav.tap()
      
      let messagesTitle = app.staticTexts["Messages"];
      expectationForPredicate(exists, evaluatedWithObject: messagesTitle, handler: nil)
      waitForExpectationsWithTimeout(10, handler: nil)
      
      let leftNav = app.otherElements["leftNavButton"]
      expectationForPredicate(exists, evaluatedWithObject: leftNav, handler: nil)
      waitForExpectationsWithTimeout(10, handler: nil)
      leftNav.tap()
      
      let profileBtn = app.otherElements["     J   John Smith View Account"]
      expectationForPredicate(exists, evaluatedWithObject: profileBtn, handler: nil)
      waitForExpectationsWithTimeout(10, handler: nil)
      XCTAssert(profileBtn.exists)
      
//      let profileTitle = app.otherElements["     J   John Smith View Account"]
//      XCTAssert(profileTitle.exists)
//      
      profileBtn.tap()
      let title = app.staticTexts["My Account"];
      expectationForPredicate(exists, evaluatedWithObject: title, handler: nil)
      waitForExpectationsWithTimeout(10, handler: nil)
      
      let myAccount = app.otherElements["myAccount"]
      expectationForPredicate(exists, evaluatedWithObject: myAccount, handler: nil)
      waitForExpectationsWithTimeout(10, handler: nil)
      XCTAssert(myAccount.exists)
      
      let logout = app.otherElements[" Logout"]
      XCTAssert(logout.exists)
      myAccount.scrollUpUntilVisible(logout);
      logout.tap()
      }
  
}
