import { Image, Text } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { animate, useMotionValue } from "framer-motion";

import { motion } from "framer-motion-3d";
import { atom, useAtom } from "jotai";
import { useEffect, useRef } from "react";

export const projects = [
  {
    title: "Textil Arbeit",
    url: "https://youtu.be/CwW7YOBUYng",
    image: "projects/wawatmos.jpg",
    description: "Suspense Fashion Film about abusive employment",
  },
  {
    title: "Martina se va",
    url: "https://youtu.be/FoJvQwK4riM",
    image: "projects/baking.jpg",
    description: "Breakup of a relationship between athletes",
  },
  {
    title: "Old REEL",
    url: "https://youtu.be/70HsdvfNZkg",
    image: "projects/avatar.jpg",
    description: "Different videos directed and edited for Estudio Paula ®",
  },
  {
    title: "GROZNY",
    url: "https://youtu.be/n50kpAHdUw0",
    image: "projects/kanagame.jpg",
    description: "Video Tríptico sobre Grozny 2002, la ciudad más debastada del planeta",
  },
  {
    title: "B.Ventanas",
    url: "https://youtu.be/BkXsb7a6sqs",
    image: "projects/loader.jpg",
    description: "Video Tríptico sobre mis recuerdos infantiles en el balneario Ventanas.",
  },
  {
    title: "Mis Vacaciones",
    url: "https://youtu.be/-eMFt-egXCo",
    image: "projects/loader1.jpg",
    description: "Video Tríptico Machinima sobre Natalia Gomez y su monólogo sobre el amor (2013)",
  },
  {
    title: "Renueva tu Closet",
    url: "https://youtu.be/35N1p0pNKY8",
    image: "projects/loader2.jpg",
    description: "Melinoto y Renueva tu Closet Versión Argentina corta duración",
  },
  {
    title: "pre-RANDOM",
    url: "https://youtu.be/oFphnZlk4V8",
    image: "projects/loader3.jpg",
    description: "SPOT-Machinima: Invitación a participar del proyecto RANDOM",
  },
  {
    title: "Video Clips",
    url: "https://youtu.be/GA3CA4K5_ws",
    image: "projects/loader4.jpg",
    description: "Baila Conmigo - Los Verdaderos Cabreras",
  },
  {
    title: "INVITACIÓN 7",
    url: "https://youtu.be/ROnm3Ed1dcg",
    image: "projects/loader5.jpg",
    description: "MicroVideo para invitación proyecto 7",
  },
  {
    title: "RANDOM",
    url: "https://youtu.be/6DlwEnoB5Bg",
    image: "projects/loader6.jpg",
    description: "Video instalacion de 3 sueños desarrollados en Machinima",
  },
];

const Project = (props) => {
  const { project, highlighted } = props;

  const background = useRef();
  const bgOpacity = useMotionValue(0.4);

  useEffect(() => {
    animate(bgOpacity, highlighted ? 0.7 : 0.4);
  }, [highlighted]);

  useFrame(() => {
    background.current.material.opacity = bgOpacity.get();
  });

  return (
    <group {...props}>
      <mesh
        position-z={-0.001}
        onClick={() => window.open(project.url, "_blank")}
        ref={background}
      >
        <planeGeometry args={[2.2, 2]} />
        <meshBasicMaterial color="black" transparent opacity={0.4} />
      </mesh>
      <Image
        scale={[2, 1.2, 1]}
        url={project.image}
        toneMapped={false}
        position-y={0.3}
      />
      <Text
        maxWidth={2}
        anchorX={"left"}
        anchorY={"top"}
        fontSize={0.2}
        position={[-1, -0.4, 0]}
      >
        {project.title.toUpperCase()}
      </Text>
      <Text
        maxWidth={2}
        anchorX="left"
        anchorY="top"
        fontSize={0.1}
        position={[-1, -0.6, 0]}
      >
        {project.description}
      </Text>
    </group>
  );
};

export const currentProjectAtom = atom(Math.floor(projects.length / 2));

export const Projects = () => {
  const { viewport } = useThree();
  const [currentProject] = useAtom(currentProjectAtom);

  return (
    <group position-y={-viewport.height * 2 + 1}>
      {projects.map((project, index) => (
        <motion.group
          key={"project_" + index}
          position={[index * 2.5, 0, -3]}
          animate={{
            x: 0 + (index - currentProject) * 2.5,
            y: currentProject === index ? 0 : -0.1,
            z: currentProject === index ? -2 : -3,
            rotateX: currentProject === index ? 0 : -Math.PI / 3,
            rotateZ: currentProject === index ? 0 : -0.1 * Math.PI,
          }}
        >
          <Project project={project} highlighted={index === currentProject} />
        </motion.group>
      ))}
    </group>
  );
};
