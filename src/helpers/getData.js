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

    const seatCount = d3.nest()
        .key(function(d) { return d['year'] })
        .rollup(function(v) { 
            return d3.sum(v, function(d) { return d.seats }) 
        })
        .entries(aspectFilteredData);

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