var ListYourStayPage =require ('../Pages/ListYourStay.page.js');

describe('4stay.com list your stay functionality', () => {
    beforeAll(()=>{
        browser.waitForAngularEnabled(false);

        // browser.get('https://4stay.com/');
        // browser.sleep(2000);
        // ListYourStayPage.navigateToList.click();
        browser.get('https://4stay.com/how-to-become-a-host');
       

    //     // Base.navigateToHome();
    //     // HomePage.managerLoginButton.click();
    //     // AddCustomerPage.goToAddCustomer();

    });

  it('should have correct page title', () => {
      expect(browser.getTitle()).toEqual('How to become a host | Room rental, roommate finder, off-campus housing, homestay | 4stay');
      });

  it('should display logo on top left ', () => {
        expect(element(by.css("img[alt='Logo']")).isDisplayed()).toBe(true);
        
      });

      
  it('should display search box', () => {

        expect($("#top-place-search-box").isDisplayed()).toBe(true);
        expect($("#top-place-search-box").getAttribute("placeholder")).toEqual('Type your school name');
        expect($('.fa.fa-search').isEnabled()).toBe(true);        
         
      });


  it('should display LOG IN', () => {

    expect($("#top-navbar li:nth-child(1)").getText()).toEqual('LOG IN');
    expect($("#top-navbar li:nth-child(1)").isDisplayed()).toBe(true);
    
  });
  it('should display SIGN UP', () => {

    expect($("#top-navbar li:nth-child(2)").getText()).toEqual('SIGN UP');
    expect($("#top-navbar li:nth-child(2)").isDisplayed()).toBe(true);
    
  });

  it('should display HELP', () => {

    expect($("#top-navbar li:nth-child(3)").getText()).toEqual('HELP');
    expect($("#top-navbar li:nth-child(3)").isDisplayed()).toBe(true);
    
  });

  it('should display LIST YOUR STAY', () => {

    expect($("#top-navbar li:nth-child(4)").getText()).toEqual('LIST YOUR STAY');
    expect($("#top-navbar li:nth-child(4)").isDisplayed()).toBe(true);

  });

  it('should display page header', () => {

        expect(ListYourStayPage.pageHeader.getText()).toEqual("SIGN UP — IT'S FREE!");
        expect(ListYourStayPage.pageHeader.isDisplayed()).toBe(true);
         
      });

      


  it('should display form for signing up', () => {
      expect(ListYourStayPage.listYourstayForm.isDisplayed()).toBe(true);
      
    
     });

  it('should confirm Facebook logo and text', () => {
       
       expect(ListYourStayPage.facebookLogo.isDisplayed()).toBe(true);
        expect(ListYourStayPage.facebookText.getText()).toEqual('SIGN UP WITH FACEBOOK');
    });

  it('should should confirm Google logo and text', () => {
        
        expect(ListYourStayPage.googleLogo.isDisplayed()).toBe(true);
        expect(ListYourStayPage.googleText.getText()).toEqual('SIGN UP WITH GOOGLE');
    });

  it('should require first name, and confirm first name field ', () => {
    
    expect(ListYourStayPage.firstName.getAttribute('required')).toEqual('true');

    expect(ListYourStayPage.firstName.isDisplayed()).toBe(true);
    expect(ListYourStayPage.firstName.isPresent()).toBe(true);
    expect(ListYourStayPage.firstName.getAttribute("placeholder")).toEqual('First name');
      
    });

  it('should require last name and confirm last name field ', () => {
    expect(ListYourStayPage.lastName.getAttribute('required')).toEqual('true');

    expect(ListYourStayPage.lastName.isDisplayed()).toBe(true);
    expect(ListYourStayPage.lastName.isPresent()).toBe(true);
    expect(ListYourStayPage.lastName.getAttribute("placeholder")).toEqual('Last name');
      
  });

  it('should require email address and confirm email address field ', () => {

    expect(ListYourStayPage.email.getAttribute('required')).toEqual('true');
    expect(ListYourStayPage.email.isDisplayed()).toBe(true);
    expect(ListYourStayPage.email.isPresent()).toBe(true);
    expect(ListYourStayPage.email.getAttribute("placeholder")).toEqual('Email address');
      
  });

  it('password field ', () => {

    expect(ListYourStayPage.password.isDisplayed()).toBe(true);
    expect(ListYourStayPage.password.isPresent()).toBe(true);
    expect(ListYourStayPage.password.getAttribute("placeholder")).toEqual('Password');
      
  });

  it('should require phone number field and confirm phone number field', () => {
    expect(ListYourStayPage.phone.getAttribute('required')).toEqual('true');
    expect(ListYourStayPage.phone.isDisplayed()).toBe(true);
    expect(ListYourStayPage.phone.isPresent()).toBe(true);
    expect(ListYourStayPage.phone.getAttribute("placeholder")).toEqual('Phone');
      
  });


  fit('checkbox field ', () => {

    expect(ListYourStayPage.checkbox.isEnabled()).toBe(true);
    //$('.checkbox.i-minus-checks i').click();

    expect(ListYourStayPage.checkboxText.getText()).toEqual('I accept the 4stay.com');
    expect(ListYourStayPage.accept.isPresent()).toBe(true);
    expect(ListYourStayPage.accept.isDisplayed()).toBe(true);

  
    expect(ListYourStayPage.termsAndconditions.isDisplayed()).toBe(true);
    expect(ListYourStayPage.termsAndconditions.isPresent()).toBe(true);
    expect(ListYourStayPage.termsAndconditions.getText()).toEqual('Terms and Conditions');
    expect(ListYourStayPage.termsAndconditionsTag.getTagName()).toBe('a');
    

      
  });

  it('create account field ', () => {

    expect(ListYourStayPage.createAccount.isDisplayed()).toBe(true);
    expect(ListYourStayPage.createAccount.isPresent()).toBe(true);
    expect(ListYourStayPage.createAccount.isEnabled()).toBe(true);
    ListYourStayPage.createAccount.click();
    //browser.sleep(3000);
      
  });

  it('create account field ', () => {

    expect(ListYourStayPage.alreadyHaveAccountLink.isDisplayed()).toBe(true);
    expect(ListYourStayPage.alreadyHaveAccountLink.isPresent()).toBe(true);
    expect(ListYourStayPage.alreadyHaveAccountLink.isEnabled()).toBe(true);
    expect(ListYourStayPage.alreadyHaveAccountLink.getText()).toEqual("Already have an account? Login here!");
    expect(ListYourStayPage.alreadyHaveAccountLinkTag.getTagName()).toBe('a');
    ListYourStayPage.alreadyHaveAccountLink.click();
    browser.sleep(3000);
      
  });


  it('should confirm color change when clicked', () => {

    $('#first_name').getCssValue('color').then(function(color){
      console.log('color before click is' + color);
    });

      $("#first_name").sendKeys(" ");
      $('#first_name').getCssValue('color').then(function(color){
        console.log('color after click is' + color);
        browser.sleep(3000);
    });

    it('should test github:)',()=>{



    });


    
 

});



//   input[type="checkbox"]






});