export default {
  // to split the video into pieces [start, end]
  intervals: [
    ['00:00:13.800', '00:02:40:000'],
    ['00:03:04.000', '00:05:44:000'],
    ['00:06:13.500', '00:10:35.200'],
    ['00:10:53.000', '00:27:45.000'],
    ['00:29:20.000', '00:34:33.400'],
    ['00:35:39.300', '00:50:30.500'],
    ['00:50:38.400', '00:50:40.200']
  ],
  // the input file to be processed
  input: '/Users/starter/Movies/2021-07-26_12-35-57.mp4',
  concat: false // if it's true, it will concat all the files into one
}
