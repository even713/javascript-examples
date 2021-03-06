var laygoon = {};

laygoon.util = {
	BaseNgClass: class {
		constructor(...injectAry) {
			let injects;
			if(injectAry[0] && injectAry[0].constructor === Array) {
				injects = injectAry[0];
			} else {
				injects = injectAry;
			}
			if(injects && injects.length) {
				injects.forEach((inject, i) => this[this.constructor.ngInject[i]] = inject);
			}
		}

		static create(...opts) {
			let createFunction = (...injects) => {
				let args = [injects].concat(opts);
				return new this(...args);
			}
			createFunction.$inject = this.ngInject;
			return createFunction;
		}

		// make injection inherited from parent
		static inject(injects) {
			if(!this.ngInject) {
				this.ngInject = injects;
			} else {
				this.ngInject = [...new Set(this.ngInject.concat(injects))];
			}
		};

	}
}
laygoon.util.BaseDirectiveClass = class extends laygoon.util.BaseNgClass {

	// Inherit scope properties from parent
	setScope(newScope) {

		if(!this.scope) {
			this.scope = newScope;
		} else {
			$.extend( this.scope, newScope );
		}

	}

	compile() {
		// If both compile/link function exist, directive will execute compile function

		// make "this" point to directive class in link/pre functions
		// make "this.scope" point to the "scope" in link/pre functions so that the scope
		// can be accessed in class methods.
		if (typeof this.link == "function") {
			let lnk = this.link;
			this.link = (...args) => {
				this.scope = args[0];
				lnk.apply(this, args);
			}
		} else if(typeof this.link == "object") {
			if(this.link.pre && typeof this.link.pre == "function") {
				let pre = this.link.pre;
				this.link.pre = (...args) => {
					this.scope = args[0];
					pre.apply(this, args);
				}
			}
			if(this.link.post && typeof this.link.post == "function") {
				let post = this.link.post;
				this.link.post = (...args) => {
					this.scope = args[0];
					post.apply(this, args);
				}
			}
		} else {
			console.log("error in directive link.");
		}

		return this.link;
	}

};

laygoon.util.BaseFactoryClass = class extends laygoon.util.BaseNgClass {
	static create(...opts) {
		let createFunction = (...injects) => {
			let factory = this;
			return function(...params) {
				let args = [injects].concat(params).concat(opts);
				return new factory(...args);
			};
		};
		createFunction.$inject = this.ngInject;
		return createFunction;
	}
}
