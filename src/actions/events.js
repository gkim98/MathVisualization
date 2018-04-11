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