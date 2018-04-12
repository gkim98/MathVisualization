export const sortByArrayKeys = (one, two) => {
    if(one.key < (two.key)) {
        return -1;
    } else {
        return 1;
    }
}