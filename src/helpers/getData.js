import * as d3 from 'd3';
import courses from '../data/courses';
import { sortByArrayKeys } from './sorters';

// gets data for the stacked bar chart
const stackedData = (feature) => {
    const featureData = d3.nest()
        .key(function(d) { return d[feature] })
        .key(function(d) { return d['year'] })
        .rollup(function(v) { 
            return d3.sum(v, function(d) { return d.seats }) 
        })
        .entries(courses);

    return featureData;
}

const subjectData = stackedData('subjectGroup');
const planData = stackedData('planGroup');

export const chooseData = (feature) => {
    if(feature === 'subjectGroup') {
        return subjectData;
    } else {
        return planData;
    }
}


// gets data for the pie chart
const getPieData = (feature) => {
    const featureData = d3.nest()
        .key(function(d) { return d[feature]})
        .rollup(function(v) {
            return d3.sum(v, function(d) { return d.seats })
        })
        .entries(courses);

    return featureData;
}

const pieSubjectData = getPieData('subjectGroup');
const piePlanData = getPieData('planGroup');

export const getPie = (feature) => {
    if(feature === 'subjectGroup') {
        return pieSubjectData;
    } else {
        return piePlanData;
    }
}

// filter by year range
export const yearFilter = (startYear, endYear, data) => {
    return data.map((featureData) => { 
        return {
            key: featureData.key,
            values: featureData.values.filter((yearData) => {
                return yearData.key >= startYear
                    && yearData.key <= endYear;
            })
        }
    })
}

// get year tick labels
const years = [];
for(let i = 2005; i < 2018; i++) {
    years.push(i)
};

export const yearTickLabels = (startYear, endYear) => {
    const filteredYears = years.filter((year) => {
        return year >= startYear && year <= endYear;
    });

    return filteredYears.map((year) => {
        return String(year);
    });
}

// get line data
export const lineData = (aspect, feature, startYear, endYear) => {
    const aspectFilteredData = courses.filter((course) => {
        return course[feature] == aspect;
    });

    const yearFilteredData = aspectFilteredData.filter((d) => {
        return d.year >= startYear && d.year <= endYear;
    });

    const seatCount = d3.nest()
        .key(function(d) { return d['year'] })
        .rollup(function(v) { 
            return d3.sum(v, function(d) { return d.seats }) 
        })
        .entries(yearFilteredData);

    return seatCount;
}

// get year's feature data
export const childBarData = (year, feature) => {
    const yearFilteredData = courses.filter((course) => {
        return course.year == year;
    })

    const aspectCount = d3.nest()
        .key((d) => (d[feature]))
        .rollup((v) => {
            return d3.sum(v, (c) => c.seats)
        })
        .entries(yearFilteredData)

    aspectCount.sort(sortByArrayKeys)

    return aspectCount;
}

// converts array of objects to an object
const arrayToObject = (arr, keyField) => Object.assign({},
    ...arr.map(item => ({[item[keyField]]: item})));

// get growth bar chart data
export const growthData = (year, feature) => {
    const currentData = arrayToObject(childBarData(year, feature), 'key');
    if(year == 2005) return null;
    const lastData = arrayToObject(childBarData(year - 1, feature), 'key');

    const changeData = {};
    const currentAspects = Object.keys(currentData);
    currentAspects.forEach(function(aspect) {
        if(!!!lastData[aspect]) return
        changeData[aspect] = 
            ((currentData[aspect].value - lastData[aspect].value) / lastData[aspect].value * 100)
            .toFixed(2);
    });

    const changeArray = [];
    const filteredAspects = Object.keys(changeData);
    filteredAspects.forEach(function(aspect) {
        changeArray.push({
            x: aspect,
            y: parseInt(changeData[aspect])
        });
    });
    return(changeArray);
}