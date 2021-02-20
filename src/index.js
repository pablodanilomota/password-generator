/**
 * Function with chain responsability to password generate.
 */
const passwordGenerate = (params) => ({ 
  /**
   * Variables.
   */
  optionsToGenerate: [],
  generatedPassword: '',
  
  /**
   * Default values to generate.
   */
  defaultOptions: function () {
    this.optionsToGenerate = [...defaultWord]
    
    return this
  } ,
  
  /**
   * Add upper case words in filter.
   */
  upperCase: function() {    
    if(params.hasUpperCaseWord) {
      this.optionsToGenerate = [...this.optionsToGenerate, ...upperCaseWord]
    }
    
    return this
  },
  
  /**
   * Add numbers in filter.
   */
  number: function() {    
    if(params.hasNumber) {
      this.optionsToGenerate = [...this.optionsToGenerate, ...numbers]
    }
    
    return this
  },

  /**
   * Add special characters in filter.
   */
  specialCharacter: function() {    
    if(params.hasSpecialCharacter) {
      this.optionsToGenerate = [...this.optionsToGenerate, ...specialCharacters]
    }
    
    return this
  },
  
  /**
   * Generate a password.
   */
  passwordGenerate: function() {
    const characters = this.optionsToGenerate.join('')
    
    return this.generatedPassword = Array(params.passwordLength)
      .fill(characters)
      .map(word => word[Math.floor(Math.random() * word.length)]).join('')   
  }
})


/**
 * Add event in generate button.
 */
document.getElementById('generate-button').addEventListener('click', (function() {
  /**
   * Password length
   */
  const passwordLength = parseInt(document.getElementById('characters-input').value)
  const hasNumber = document.getElementById('number-checkbox').checked
  const hasUpperCaseWord = document.getElementById('upper-case-checkbox').checked
  const hasSpecialCharacter = document.getElementById('special-character-checkbox').checked

  /**
   * Options to generate.
   */
  const options = {
    hasNumber,
    passwordLength: passwordLength || 1,
    hasUpperCaseWord,
    hasSpecialCharacter,
  }

  document.getElementById('password-input').value = passwordGenerate(options)
    .defaultOptions()
    .upperCase()
    .number()
    .specialCharacter()
    .passwordGenerate()
}))

/**
 * Add event in copy button.
 */
document.getElementById('copy-button').addEventListener('click', (function() {
  const generatedPassword = document.getElementById('password-input').value
  copyToClipboard(generatedPassword) 
}))
