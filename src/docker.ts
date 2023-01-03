import Dockerode from "dockerode";

const globalForDockernode = global as unknown as { dockernode: Dockerode };

const docker = globalForDockernode.dockernode || new Dockerode();

if (process.env.NODE_ENV !== "production") globalForDockernode.dockernode = docker;

export default docker;
