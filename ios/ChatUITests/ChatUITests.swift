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
  func forceTapElement() {
    if self.hittable {
      self.tap()
    }
    else {
      let coordinate: XCUICoordinate = self.coordinateWithNormalizedOffset(CGVectorMake(0.0, 0.0))
      coordinate.tap()
    }
  }
}

class ChatUITests: XCTestCase {
  
  override func setUp() {
    super.setUp()
    continueAfterFailure = false
    let app = XCUIApplication()
    app.launchEnvironment["TESTING"] = "1";
    app.launch()
  }
  
  func waitForElementAndTap(element: XCUIElement, timeout: NSTimeInterval = 50) {
    expectationForPredicate(NSPredicate(format: "exists == true"),
                            evaluatedWithObject: element, handler: nil)
    waitForExpectationsWithTimeout(timeout, handler: nil)
    XCTAssert(element.exists)
    element.tap()
  }
  
  func testSignIn() {
    let app = XCUIApplication()
    waitForElementAndTap(app.otherElements[" Sign In"], timeout:500)
    let username = app.textFields["handle"]
    waitForElementAndTap(username)
    username.typeText("testUser1")
    
    let firstName = app.textFields["firstName"]
    waitForElementAndTap(firstName)
    firstName.typeText("John")
    
    let lastName = app.textFields["lastName"]
    waitForElementAndTap(lastName)
    lastName.typeText("Smith")
    
    waitForElementAndTap(app.otherElements[" Continue"])
    
    let rightNav = app.otherElements["rightNavButton"]
    waitForElementAndTap(rightNav)
    
    let messagesTitle = app.staticTexts["Messages"]
    waitForElementAndTap(messagesTitle)

    let leftNav = app.otherElements["leftNavButton"]
    waitForElementAndTap(leftNav)
    
    let profileBtn = app.otherElements["myAccountMenuItem"]
    waitForElementAndTap(profileBtn)
    
    let title = app.staticTexts["My Account"]
    waitForElementAndTap(title)
    
    let myAccount = app.otherElements["myAccount"]
    waitForElementAndTap(myAccount)
    
    let logout = app.otherElements[" Logout"]
    XCTAssert(logout.exists)
    myAccount.scrollUpUntilVisible(logout);
    logout.tap()
  }
  
}
