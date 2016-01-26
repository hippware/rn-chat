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
        XCUIApplication().launch()

        // In UI tests it’s important to set the initial state - such as interface orientation - required for your tests before they run. The setUp method is a good place to do this.
    }
    
    override func tearDown() {
        // Put teardown code here. This method is called after the invocation of each test method in the class.
        super.tearDown()
    }
    
    func testExample() {
      let app = XCUIApplication()
      let username = app.textFields["Username"]
      
      let exists = NSPredicate(format: "exists == true")
      expectationForPredicate(exists, evaluatedWithObject: username, handler: nil)
      waitForExpectationsWithTimeout(30, handler: nil)

      
      username.tap()
      username.clearAndEnterText("user1")
      let password = app.secureTextFields["Password"]
      password.tap()
      password.typeText("user1")
      app.otherElements[" Login!"].tap()
      
      let settings = app.otherElements[" Settings"]
      expectationForPredicate(exists, evaluatedWithObject: settings, handler: nil)
      waitForExpectationsWithTimeout(30, handler: nil)
      settings.tap()
      let logout = app.otherElements[" Logout"]
      expectationForPredicate(exists, evaluatedWithObject: logout, handler: nil)
      waitForExpectationsWithTimeout(30, handler: nil)
      
      logout.tap()
      expectationForPredicate(exists, evaluatedWithObject: username, handler: nil)
      waitForExpectationsWithTimeout(30, handler: nil)
      
      
      
  }
  
}
