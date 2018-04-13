import * as d3 from 'd3';
import courses from '../data/courses';
import { sortByArrayKeys } from '../helpers/sorters';

// array of the years
const years = [];
for(let i = 2005; i < 2018; i++) {
    years.push(i)
};

// displays the feature by number of students in each
const countByFeature = (year, feature) => {
    const yearFilteredData = courses.filter((course) => {
            return course.year == year;
        }
    )

    let seatsCount = d3.nest()
        .key((d) => (d[feature]))
        .rollup((v) => {
            return d3.sum(v, (c) => c.seats)
        })
        .entries(yearFilteredData);

    seatsCount.sort(sortByArrayKeys)
    return seatsCount;
}

// displays the feature by % of total students of each
const percentByFeature = (year, feature) => {
    const seatsCount = countByFeature(year, feature);

    let sum = 0;
    seatsCount.forEach((pair) => {
        sum += pair.value;
    });

    const percentCount = seatsCount.map((pair) => {
        return {
            ...pair,
            value: pair.value / sum
        };
    });
    console.log(percentCount);
    return percentCount;
}


// preload aggregate data for performance
// aggregates subject data on loading
const subjectData = years.map((year) => {
    return {
        year: year,
        data: countByFeature(year, 'subjectGroup')
    }
});

const planData = years.map((year) => {
    return {
        year: year,
        data: countByFeature(year, 'planGroup')
    }
});

// get year's data
export const getYearData = (theYear, feature) => {
    if(feature==='subjectGroup') {
        return subjectData.filter((year) => {
            return year.year == theYear
        })[0].data;
    } else {
        return planData.filter((year) => {
            return year.year == theYear
        })[0].data;
    }
}