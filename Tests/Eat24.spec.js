describe('Eat 24 Group Project', () => {
    beforeAll(()=>{
        browser.waitForAngularEnabled(false);
        browser.get('https://www.eat24.com/');
        if($('.c-modal-close').isDisplayed()){
            $('.c-modal-close').click();
        }
     
        
    });
    
    it('should check logo', function() {
        
        browser.sleep(1000);
        expect($('.mainNavBrand-logo').isDisplayed()).toBe(true);
    });

    it('should check Sign in button isEnabled', () => {
      expect(element(by.cssContainingText('span','Sign in')).isEnabled()).toBe(true);
    });

    it('should check bag button isEnabled', () => {
        expect($('#bag').isEnabled()).toBe(true);
    });

    it('should check the text on home page', () => {
        expect($$('.c-hero-container>span').first().getText().then((text)=>{return text;})).toContain('Order food');
    });

    it('should check Start your order now text', () => {
        expect($('.startOrder-form-instructions>h6').getText().then((text)=>{return text;})).toContain('Enter your address');
    });

    it('should check visibility of check box & Find food button ', () => {
        expect($('.s-col-xs').isDisplayed()).toBe(true);
        expect($('#ghs-startOrder-searchBtn').isDisplayed()).toBe(true);
    });

    xit('should write smth in search box and hit enter', () => {
        $('.s-col-xs input').sendKeys('Sugar Land').then(()=>{
            $('#ghs-startOrder-searchBtn').click();
        });

    });

    it('should check the text on banner section', () => {
        expect($$('.c-title').first().getText().then((text)=>{return text;})).toContain('Big news');
        
    });
    
    it('should check the text with FAQs link', () => {
        expect($$('.c-body').first().getText().then((t)=>{return t;})).toContain('Order from all your Eat24');
    });

    it('should check the EAT24 & GRUBHUB Logo bags in the banner', () => {
        expect($$("[class='c-banner-section c-banner-section--image c-image']").first().isDisplayed()).toBe(true);
    });
    
    it('should check the css value of background-image', () => {
        expect($('.startOrder.u-homepageOrder-0>div').getCssValue('background-image').then((v)=>{return v;})).toContain('https://res.cloudinary.com/grubhub-assets/image');
    });

});