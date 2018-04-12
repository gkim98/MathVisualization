import * as d3 from 'd3';
import courses from '../data/courses';
import { sortByArrayKeys } from '../helpers/sorters';

export const countByFeature = (year, feature) => {
    const yearFilteredData = courses.filter((course) => {
            return course.year == year;
        }
    )

    let seatsCount = d3.nest()
        .key((d) => (d.subjectGroup))
        .rollup((v) => {
            return d3.sum(v, (c) => c.seats)
        })
        .entries(yearFilteredData);

    seatsCount.sort(sortByArrayKeys)
    return seatsCount;
}