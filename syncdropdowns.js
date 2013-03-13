/**
 * jQuery Plugin to Sync multiple "select" elements together
 * by their option values
 * @author billy@yext.com
 *  
 * @usage $('selector').syncDropdowns();
 * 
 * 
 */
(function($) {
  $.fn.syncDropdowns = function() {
    var selectedOptions = {}; // Used to store a history of dropdown selected options
    var elms = this; // Collection of the dropdowns to sync
	  
    // Sync only the selectors that this was initiated on
    return this.each(function(selectedIndex) {
      
      /**
       * Update the options of all the dropdowns (exclude selected)
       * based on the option that was selected
       * 
       * @param {Integer} selectedIndex
       * @param {String} selectedValue
       * @param {String} previousValue
       */
      var updateDropdowns = function(selectedIndex, selectedValue, previousValue) {
        elms.each(function(index) {
          if (selectedIndex == index) {
            return;
          }          
          
          // Add options back if it's no longer selected by another dropdown
          if (previousValue) {
            $(this).find('option[value="' + previousValue + '"]').removeAttr('disabled');
          }
          
          // Remove the selected option from other dropdowns     
          $(this).find('option[value="' + selectedValue + '"]').attr('disabled', 'disabled');
        });
      }  

      // Listen for the change of options and update
      // the other dropdowns based on the selection
      $(this).change(function() {
        var selectedText = $(this).find(':selected').text(),
            selectedValue = $(this).val(),
            previousValue;
        
        // Check if the selected dropdown had a previous value
        // and then refresh the other dropdowns accordingly
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
  }
})(jQuery);
