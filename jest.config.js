module.exports = {
  testEnvironment: 'jsdom', // Окружение для тестирования
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy', // Мок для CSS
  },
  transform: {
    '^.+\\.js$': 'babel-jest', // Использование Babel для тестов
  },
  coverageDirectory: 'coverage', // Папка для отчетов о покрытии
  collectCoverageFrom: ['src/**/*.js'], // Файлы для анализа покрытия
};
