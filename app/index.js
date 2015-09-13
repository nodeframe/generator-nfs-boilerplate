var generators = require('yeoman-generator'),
	yosay = require('yosay'),
	chalk = require('chalk'),
	_ = require('lodash');

module.exports = generators.Base.extend({
	prompting:function(){
		var done = this.async();
		var prompts = [
            {
                type: 'input',
                name: 'name',
                message: 'Your project name',
                default: _.kebabCase(this.appname)
            }];

		this.log(yosay('Welcome to the '+chalk.green('nfs-boilerplate')+' generator!'));
		this.prompt(prompts, function (props) {
            this.props = props;
            done();
        }.bind(this));
	},
	writing:function(){
		var name = _.kebabCase(this.props.name);

		 this.fs.copyTpl(
            this.templatePath('_package.json'),
            this.destinationPath('package.json'),
            { name: name }
        );

		 this.fs.copyTpl(
            this.templatePath('_bower.json'),
            this.destinationPath('bower.json'),
            { name: name }
        );

		this.fs.copy(this.templatePath('_bowerrc'), this.destinationPath('.bowerrc'));
		this.fs.copy(this.templatePath('gitignore'), this.destinationPath('.gitignore'));
		this.fs.copy(this.templatePath('tsconfig.json'), this.destinationPath('tsconfig.json'));
		this.fs.copy(this.templatePath('webpack.config.js'), this.destinationPath('webpack.config.js'));

		/* folder */
		this.fs.copy(this.templatePath('tests/**'), this.destinationPath('tests/'));
		this.fs.copy(this.templatePath('src/**'), this.destinationPath('src/'));
		this.fs.copy(this.templatePath('public/**'), this.destinationPath('public/'));
	},
	install:function(){
		this.installDependencies();
	}
});