-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : ven. 05 jan. 2024 à 16:38
-- Version du serveur : 8.0.31
-- Version de PHP : 8.0.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `onyx`
--

-- --------------------------------------------------------

--
-- Structure de la table `gamed`
--

DROP TABLE IF EXISTS `gamed`;
CREATE TABLE IF NOT EXISTS `gamed` (
  `numPartie` int NOT NULL,
  `numClick` int NOT NULL,
  `valClickChrono` decimal(10,2) NOT NULL
) ENGINE=MyISAM AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `gamed`
--

INSERT INTO `gamed` (`numPartie`, `numClick`, `valClickChrono`) VALUES
(328, 1, '0.00'),
(328, 2, '477.00'),
(328, 3, '718.00'),
(328, 4, '570.00'),
(328, 5, '563.00'),
(328, 6, '719.00'),
(328, 7, '609.00'),
(329, 1, '0.00'),
(329, 2, '794.00'),
(329, 3, '925.00'),
(329, 4, '951.00'),
(329, 5, '931.00'),
(329, 6, '917.00'),
(329, 7, '896.00'),
(330, 1, '0.00'),
(330, 2, '536.00'),
(330, 3, '520.00'),
(330, 4, '413.00'),
(330, 5, '501.00'),
(330, 6, '506.00'),
(330, 7, '792.00'),
(331, 1, '0.00'),
(331, 2, '560.00'),
(331, 3, '791.00'),
(331, 4, '626.00'),
(331, 5, '711.00'),
(331, 6, '645.00'),
(331, 7, '539.00'),
(332, 1, '0.00'),
(332, 2, '433.00'),
(332, 3, '573.00'),
(332, 4, '494.00'),
(332, 5, '502.00'),
(332, 6, '529.00'),
(332, 7, '547.00'),
(333, 1, '0.00'),
(333, 2, '465.00'),
(333, 3, '687.00'),
(333, 4, '585.00'),
(333, 5, '447.00'),
(333, 6, '1568.00'),
(333, 7, '580.00'),
(334, 1, '0.00'),
(334, 2, '579.00'),
(334, 3, '572.00'),
(334, 4, '567.00'),
(334, 5, '475.00'),
(334, 6, '967.00'),
(334, 7, '660.00');

-- --------------------------------------------------------

--
-- Structure de la table `gameh`
--

DROP TABLE IF EXISTS `gameh`;
CREATE TABLE IF NOT EXISTS `gameh` (
  `numPartie` int NOT NULL AUTO_INCREMENT,
  `pseudo` text NOT NULL,
  `valMeilleurChrono` decimal(10,3) NOT NULL,
  `valMoyenneChrono` decimal(10,3) NOT NULL,
  `dateHeure` datetime NOT NULL,
  PRIMARY KEY (`numPartie`)
) ENGINE=MyISAM AUTO_INCREMENT=335 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `gameh`
--

INSERT INTO `gameh` (`numPartie`, `pseudo`, `valMeilleurChrono`, `valMoyenneChrono`, `dateHeure`) VALUES
(328, 'Rafik', '477.000', '609.333', '2024-01-04 21:39:22'),
(329, 'Rafik', '794.000', '902.333', '2024-01-04 21:40:13'),
(330, 'Rafik', '413.000', '544.667', '2024-01-04 21:40:20'),
(331, 'Rafik', '539.000', '645.333', '2024-01-04 21:40:27'),
(332, 'Rafik', '433.000', '513.000', '2024-01-04 21:41:17'),
(333, 'Rafik', '447.000', '722.000', '2024-01-04 21:49:44'),
(334, 'Rafik', '475.000', '636.667', '2024-01-05 16:23:12');

-- --------------------------------------------------------

--
-- Structure de la table `utilisateur`
--

DROP TABLE IF EXISTS `utilisateur`;
CREATE TABLE IF NOT EXISTS `utilisateur` (
  `id` int NOT NULL AUTO_INCREMENT,
  `pseudo` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `utilisateur`
--

INSERT INTO `utilisateur` (`id`, `pseudo`) VALUES
(1, 'Rafik'),
(13, 'blabla'),
(12, 'Ramazan '),
(11, 'Walid'),
(10, 's'),
(9, 'BouchennaRafik'),
(14, 'd'),
(15, 'hsdd');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
