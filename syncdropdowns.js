/**
 * jQuery Plugin to Sync multiple "select" elements together
 * by their option values
 * 
 * @author billy@yext.com
 *  
 * @usage $('selector').syncDropdowns();
 */
;(function($) {
  $.fn.syncDropdowns = function() {
    var selectedOptions = {}, // Used to store a history of selected options
        $elms = this; // Collection of the dropdowns (elements) to sync
	  
    // Sync only the selectors that this was initiated on
    return this.each(function(selectedIndex) {
      
      /**
       * Update the options of all the dropdowns 
       * based on the option that was selected (exclude changed dropdown)
       * 
       * @param {Integer} selectedIndex
       * @param {String} selectedValue
       * @param {String} previousValue
       */
      var updateDropdowns = function(selectedIndex, selectedValue, previousValue) {
        $elms.each(function(index) {
          if (selectedIndex == index) {
            return;
          }          
          
          // Add the option back if the changed dropdown had a previous selection
          if (previousValue) {
            $(this).find('option[value="' + previousValue + '"]').removeAttr('disabled');
          }
          
          // Remove the option that was selected from the changed dropdown     
          $(this).find('option[value="' + selectedValue + '"]').attr('disabled', 'disabled');
        });
      };

      // Listen for the change of options and update
      // the dropdowns based on the users selection
      $(this).change(function() {
        var selectedText = $(this).find(':selected').text(),
            selectedValue = $(this).val(),
            previousValue;
        
        // Check if the selected dropdown had a previous value
        // and then update the other dropdowns accordingly
        if (selectedOptions[selectedIndex]) {
          previousValue = selectedOptions[selectedIndex].value;
        }        
        updateDropdowns(selectedIndex, selectedValue, previousValue);
        
        // Keep a history of the dropdowns selected options
        selectedOptions[selectedIndex] = { 
          value : selectedValue,
          text : selectedText
        };
      });  
    });
  };
})(jQuery);
