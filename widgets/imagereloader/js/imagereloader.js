/*
    VIS-2 Image Reloader Widget
    version: "1.0.0"
    Copyright 2025 lenusch
*/
"use strict";

// Add translations for edit mode
if (vis.editMode) {
    $.extend(true, systemDictionary, {
        "imagePath":      {"en": "Image Path",       "de": "Bildpfad"},
        "imageWidth":     {"en": "Width",            "de": "Breite"},
        "imageHeight":    {"en": "Height",           "de": "Höhe"},
        "reloadInterval": {"en": "Reload Interval",  "de": "Neuladen-Intervall"},
        "fitMode":        {"en": "Fit Mode",         "de": "Anpassungsmodus"},
        "borderRadius":   {"en": "Border Radius",    "de": "Eckenradius"},
        "showBorder":     {"en": "Show Border",      "de": "Rahmen anzeigen"},
        "borderColor":    {"en": "Border Color",     "de": "Rahmenfarbe"},
        "backgroundColor": {"en": "Background Color", "de": "Hintergrundfarbe"}
    });
}

// Widget bindings
vis.binds.imagereloader = {
    version: "1.0.0",
    
    showVersion: function () {
        if (vis.binds.imagereloader.version) {
            console.log('%c[vis-imagereloader] Loaded version: ' + vis.binds.imagereloader.version, 'color: #4CAF50; font-weight: bold;');
            vis.binds.imagereloader.version = null;
        }
    },

    // Storage for active intervals
    intervals: {},

    tplImageReloader: function (widgetID, view, data) {
        console.log('[tplImageReloader] Initializing widget:', widgetID);
        
        const $widget = $('#' + widgetID);
        const $img = $widget.find('.image-reloader-img');
        const $status = $widget.find('.image-reloader-status');
        
        // If widget not found, wait and retry
        if (!$widget.length) {
            return setTimeout(function () {
                vis.binds.imagereloader.tplImageReloader(widgetID, view, data);
            }, 100);
        }

        // Get configuration
        const imagePath = data.attr('imagePath') || '';
        const reloadInterval = parseInt(data.attr('reloadInterval')) || 1000;
        
        console.log('[tplImageReloader] Config - Path:', imagePath, 'Interval:', reloadInterval + 'ms');

        // Clear any existing interval for this widget
        if (vis.binds.imagereloader.intervals[widgetID]) {
            clearInterval(vis.binds.imagereloader.intervals[widgetID]);
            delete vis.binds.imagereloader.intervals[widgetID];
        }

        // Function to load image with cache busting
        function loadImage() {
            if (!imagePath) {
                console.log('[tplImageReloader] No image path configured for widget:', widgetID);
                $img.attr('src', '');
                return;
            }

            // Add timestamp to prevent caching
            const timestamp = new Date().getTime();
            const separator = imagePath.includes('?') ? '&' : '?';
            const imageUrl = imagePath + separator + '_t=' + timestamp;
            
            console.log('[tplImageReloader] Loading image:', imageUrl);
            
            // Show loading status
            $status.show().find('.status-text').text('Loading...');
            
            // Create new image to test loading
            const testImg = new Image();
            
            testImg.onload = function() {
                console.log('[tplImageReloader] Image loaded successfully:', imageUrl);
                $img.attr('src', imageUrl);
                $status.hide();
            };
            
            testImg.onerror = function() {
                console.error('[tplImageReloader] Failed to load image:', imageUrl);
                $status.show().find('.status-text').text('Error loading image');
                // Hide error after 2 seconds
                setTimeout(() => $status.hide(), 2000);
            };
            
            testImg.src = imageUrl;
        }

        // Load image immediately
        loadImage();

        // Set up interval for automatic reloading
        if (reloadInterval > 0) {
            vis.binds.imagereloader.intervals[widgetID] = setInterval(loadImage, reloadInterval);
            console.log('[tplImageReloader] Auto-reload interval set:', reloadInterval + 'ms');
        }

        // Clean up on widget destruction
        $widget.on('remove', function() {
            console.log('[tplImageReloader] Cleaning up widget:', widgetID);
            if (vis.binds.imagereloader.intervals[widgetID]) {
                clearInterval(vis.binds.imagereloader.intervals[widgetID]);
                delete vis.binds.imagereloader.intervals[widgetID];
            }
        });
    },

    // Cleanup function for all intervals
    cleanup: function() {
        console.log('[vis-imagereloader] Cleaning up all intervals');
        Object.keys(vis.binds.imagereloader.intervals).forEach(widgetID => {
            clearInterval(vis.binds.imagereloader.intervals[widgetID]);
            delete vis.binds.imagereloader.intervals[widgetID];
        });
    }
};

// Show version info
vis.binds.imagereloader.showVersion();

// Cleanup on page unload
$(window).on('beforeunload', function() {
    vis.binds.imagereloader.cleanup();
});
