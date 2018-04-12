import * as d3 from 'd3';
import courses from '../data/courses';
import { sortByArrayKeys } from '../helpers/sorters';

// displays the feature by number of students in each
export const countByFeature = (year, feature) => {
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
export const percentByFeature = (year, feature) => {
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