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
       * Disable the options that are already selected
       * @param {Object} selectedIndex
       * @param {Object} selectedValue
       */
      var disableSelected = function(selectedIndex, selectedValue) {
        elms.each(function(index) {
          if (selectedIndex == index) return;          
          
          var removeElement = $(this).find('option[value="' + selectedValue + '"]');
          if (removeElement) removeElement.attr('disabled', 'disabled')
        });
      }
      
      /**
       * Enable the options that are deselected on 
       * the other dropdowns
       * @param {Object} selectedValue
       */
      var enableDeselected = function(selectedValue) {
        elms.each(function(index) {
          if (selectedIndex == index) return;          
          var addElement = $(this).find('option[value="' + selectedValue + '"]').removeAttr('disabled');
        })
      }      
      

      // Listen for the change of options and update
      // the other dropdowns based on the selection
      $(this).change(function() {
        var selectedText = $(this).find(':selected').text();
        var selectedValue = $(this).val();
        
        // Check if the selected dropdown had a previous value
        // and then refresh the other dropdowns accordingly
        if (selectedOptions[selectedIndex]) {
          enableDeselected(selectedOptions[selectedIndex].value);
        }
        
        // Keep a history of the dropdowns selected options
        selectedOptions[selectedIndex] = { 
          value : selectedValue,
          text : selectedText
        };
        
        disableSelected(selectedIndex, selectedValue);
      });  
    });
	}
})(jQuery);
