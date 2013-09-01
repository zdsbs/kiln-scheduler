basePath = '../';

files = [
  JASMINE,
  JASMINE_ADAPTER,
  'public/lib/angular.min.js',
  'public/lib/underscore-min.js',
  'public/js/**/*.js',
  'test/lib/angular-mocks.js',
  'test/unit/**/*.js'
];

autoWatch = true;

browsers = ['Chrome'];

junitReporter = {
  outputFile: 'test_out/unit.xml',
  suite: 'unit'
};
