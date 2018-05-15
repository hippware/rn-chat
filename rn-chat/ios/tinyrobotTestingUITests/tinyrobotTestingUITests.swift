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
    guard self.exists && !frame.isEmpty else { return false }
    return XCUIApplication().windows.element(boundBy: 0).frame.contains(frame)
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
    if self.isHittable {
      self.tap()
    }
    else {
      let coordinate: XCUICoordinate = self.coordinate(withNormalizedOffset: CGVector(dx: 0.0, dy:0.0))
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
  
  func waitForElementAndTap(element: XCUIElement, timeout: TimeInterval = 50) {
    expectation(for: NSPredicate(format: "exists == true"), evaluatedWith: element, handler: nil)
    waitForExpectations(timeout: timeout, handler: nil)
    XCTAssert(element.exists)
    element.tap()
  }
  
  func testSignIn() {
    let app = XCUIApplication()
    addUIInterruptionMonitor(withDescription: "Location Dialog") { (alert) -> Bool in
      if alert.collectionViews.buttons["Allow"].exists {
        alert.collectionViews.buttons["Allow"].tap()
        return true
      }
      let button = alert.buttons["Allow"]
      if button.exists {
        button.tap()
        return true
      }
      return false
    }
    
    
    waitForElementAndTap(element: app.otherElements[" Sign In"], timeout:300)
    let username = app.textFields["handle"]
    waitForElementAndTap(element: username)
    username.typeText("testUser1")
    
    let firstName = app.textFields["firstName"]
    waitForElementAndTap(element: firstName)
    firstName.typeText("John")
    
    let lastName = app.textFields["lastName"]
    waitForElementAndTap(element: lastName)
    lastName.typeText("Smith")
    
    waitForElementAndTap(element: app.otherElements[" Done"])
    
    let rightNav = app.buttons["rightNavButton"]
    waitForElementAndTap(element: rightNav)
    
    let messagesTitle = app.staticTexts["Messages"]
    waitForElementAndTap(element: messagesTitle)
    
    let leftNav = app.buttons["leftNavButton"]
    waitForElementAndTap(element: leftNav)
    
    let profileBtn = app.otherElements["myAccountMenuItem"]
    waitForElementAndTap(element: profileBtn)
    
    //    let title = app.staticTexts["My Account"]
    //    waitForElementAndTap(element: title)
    //
    let myAccount = app.otherElements["myAccount"]
    //    waitForElementAndTap(element: myAccount)
    
    let logout = app.otherElements[" Logout"]
    myAccount.scrollUpUntilVisible(element: logout);
    logout.tap()
  }
  
}
