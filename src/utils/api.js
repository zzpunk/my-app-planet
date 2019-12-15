class Service {
    async getResourse(url) {
        const res = await fetch(url);

        if(!res.ok) {
            throw new Error (`Could not fecth ${url}`);
        }

        return await res.json();
    }

    async getAllPeople() {
        const res = await this.getResourse(`https://swapi.co/api/people`);
        return res.results;
    }

    getPerson(id) {
        return this.getResourse(`https://swapi.co/api/people/${id}`);
    }

    async getPlanets() {
        const res = await this.getResourse(`https://swapi.co/api/planets/`);
        return res.results;
    }

    getPlanet(id) {
        return this.getResourse(`https://swapi.co/api/planets/${id}`)
    }
}

export default Service;