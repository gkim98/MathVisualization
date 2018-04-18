/*
    Actions due to clicking on the barcharts
*/

// allow user to toggle the display of greater detail graphs
// click on bar --> isDisplayed is true
// click on X --> isDisplayed is false
export const changeIsDisplayed = (isDisplayed = false) => ({     
    type: 'CHANGE_IS_DISPLAYED',
    isDisplayed
});

// determines which year displayed in first child chart
export const changeYearDisplayed = (year = 2005) => ({
    type: 'CHANGE_CHILD_YEAR',
    year
});

// changes the layer that you're evaluating
export const changeFeatureDisplayed = (feature = '') => ({
    type: 'CHANGE_CHILD_FEATURE',
    feature
});
