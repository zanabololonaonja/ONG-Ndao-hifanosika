interface CardProps {
  name: string;       // pour Staff : nom / pour Projet : titre
  role?: string;      // pour Staff : rôle / pour Projet : description
  img: string;        // chemin de l'image
}

export default function Card({ name, role, img }: CardProps) {
  return (
    <div className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center hover:shadow-xl transition">
      <img src={img} alt={name} className="w-32 h-32 rounded-full mb-4 object-cover" />
      <h3 className="text-xl font-bold text-center">{name}</h3>
      {role && <p className="text-gray-500 text-center mt-1">{role}</p>}
    </div>
  );
}
