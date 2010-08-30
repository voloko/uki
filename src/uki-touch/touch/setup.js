include('../touch.js');
include('const.js'); 

uki.touch.setup = function(config) {
    if (config && isTouch) {   
        var viewport = uki.createElement('meta');
        var app = uki.createElement('meta'); 
        var statusBar = uki.createElement('meta');  
        var startupScreen = uki.createElement('link');
        var appIcon = uki.createElement('link');
        
        var head = document.getElementsByTagName('head')[0];  
        
        viewport.name = 'viewport';
        viewport.content = 'width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0;';
        
        app.name = 'apple-mobile-web-app-capable'
        app.content = 'yes';
        
        if (config.statusBarStyle) {
            statusBar.name = 'apple-mobile-web-app-status-bar-style'
            statusBar.content = config.statusBarStyle;
        }
        
        if (config.tabletStartupScreen && isIpad) {
            startupScreen.rel = 'apple-touch-startup-image';
            startupScreen.href = config.tabletStartupScreen;
        } else if (config.phoneStartupScreen && isIphone) {
            startupScreen.rel = 'apple-touch-startup-image';
            startupScreen.href = config.phoneStartupScreen;
        }
        
        if (config.icon) {
            config.phoneIcon = config.tabletIcon = config.icon;
        }
        
        var precomposed = (config.glossOnIcon == false) ? '-precomposed' : '';
        if (config.tabletIcon && isIpad) {
            appIcon.rel = 'apple-touch-icon' + precomposed;
            appIcon.href = config.tabletIcon;
        } else if (config.phoneIcon && isIphone) {
            appIcon.rel = 'apple-touch-icon' + precomposed;
            appIcon.href = config.phoneIcon;
        }
          
        head.appendChild(viewport);
        head.appendChild(app);
        if (statusBar.getAttribute('name')) head.appendChild(statusBar);
        if (appIcon.getAttribute('href')) head.appendChild(appIcon);
        if (startupScreen.getAttribute('href')) head.appendChild(startupScreen);
    }
};