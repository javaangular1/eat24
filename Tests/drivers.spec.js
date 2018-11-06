describe('Drivers GrubHub link functionalities', () => {
    
    beforeEach(function() {
        browser.waitForAngularEnabled(false);
        browser.get('https://www.eat24.com/');
        if($('.c-modal-close').isDisplayed()){
            $('.c-modal-close').click();
        }
        // browser.executeScript("arguments[0].scrollIntoView();",element(by.linkText ('Drivers')));
        element(by.linkText ('Drivers')).click();
        
        
    });

    it('should get the Title of the navigated page', () => {
        expect(browser.getTitle().then((t)=>{return t})).toEqual('Get Paid to Drive Your Car as a Grubhub Delivery Partner');
    });

    it('should check visibility of the logos at the Top Left & Right', () => {
        expect($('.topbar-logoTagImg').isDisplayed()).toBe(true);
        expect($('.topbar-logoTagImg').isEnabled()).toBe(true);
        expect($('.topbar-logoImg').isDisplayed()).toBe(true);
        expect($('.topbar-logoImg').isEnabled()).toBe(true);
    });
    
    it('should check the Earn your way,taste success.png', () => {
        expect($("[title='text_heroHed']").getAttribute('src').then((a)=>{return a})).toContain('text_heroHed.png');
    });

    it('should check Become a Grubhub driver... text', () => {
        expect(element(by.cssContainingText('h3','Become a Grubhub driver and deliver customers the food they love from their favorite restaurants.')).isDisplayed()).toBe(true);
        expect($$('.elementor-heading-title.elementor-size-default').first().getCssValue('color')).toEqual('rgba(200, 200, 199, 1)');
        expect($$('.elementor-heading-title.elementor-size-default').first().getCssValue('line-height')).toEqual('30px');
        expect($$('.elementor-heading-title.elementor-size-default').first().getCssValue('font-size')).toEqual('20px');
        expect($$('.elementor-heading-title.elementor-size-default').first().getCssValue('padding-right')).toEqual('160px');
    });

    it('should check visibility and CSS values of the Image', () => {
        expect($("[title='photo_hero1']").getAttribute('title')).toEqual('photo_hero1');
        expect($("[title='photo_hero1']").getCssValue('vertical-align').then((v)=>{return v})).toEqual('middle');
        expect($("[title='photo_hero1']").getCssValue('display').then((v)=>{return v})).toEqual('inline-block');
        expect($("[title='photo_hero1']").getCssValue('max-width').then((v)=>{return v})).toEqual('100%');
    });

});