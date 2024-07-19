# ************************************************************
# Sequel Ace SQL dump
# Version 20067
#
# https://sequel-ace.com/
# https://github.com/Sequel-Ace/Sequel-Ace
#
# Hôte: 127.0.0.1 (MySQL 8.3.0)
# Base de données: forum_emploi
# Temps de génération: 2024-06-26 09:12:46 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
SET NAMES utf8mb4;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE='NO_AUTO_VALUE_ON_ZERO', SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
SET time_zone = 'Europe/Paris';

# Dump de la table companies
# ------------------------------------------------------------

DROP TABLE IF EXISTS `companies`;

CREATE TABLE `companies` (
                             `id_company` int unsigned NOT NULL AUTO_INCREMENT,
                             `name` varchar(255) NOT NULL,
                             `description` text,
                             `logo` varchar(255) DEFAULT NULL,
                             `color` varchar(9) DEFAULT NULL,
                             `background` varchar(255) DEFAULT NULL,
                             `video` varchar(255) DEFAULT NULL,
                             `country` varchar(255) DEFAULT NULL,
                             `foundation_date` year DEFAULT NULL,
                             `employees` int DEFAULT NULL,
                             `revenue` decimal(15,2) DEFAULT NULL,
                             `website` varchar(255) DEFAULT NULL,
                             `secteur_activite_id` int unsigned NOT NULL,
                             PRIMARY KEY (`id_company`),
                             KEY `secteurs_activites_id` (secteur_activite_id),
                             CONSTRAINT `company_ibfk_1` FOREIGN KEY (`secteur_activite_id`) REFERENCES `secteurs_activites` (id_secteurs_activites)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

# Dump de la table company_tags
# ------------------------------------------------------------

DROP TABLE IF EXISTS `company_tags`;

CREATE TABLE `company_tags` (
                                `id_company_tag` int unsigned NOT NULL AUTO_INCREMENT,
                                `tag_id` int unsigned NOT NULL,
                                `company_id` int unsigned NOT NULL,
                                PRIMARY KEY (`id_company_tag`),
                                KEY `tag_id` (`tag_id`),
                                KEY `company_id` (`company_id`),
                                CONSTRAINT `company_tags_ibfk_1` FOREIGN KEY (`tag_id`) REFERENCES `tags` (`id_tag`),
                                CONSTRAINT `company_tags_ibfk_2` FOREIGN KEY (`company_id`) REFERENCES `companies` (`id_company`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

# Dump de la table configs
# ------------------------------------------------------------

# DROP TABLE IF EXISTS `configs`;

# CREATE TABLE `configs` (
#                           `date_forum` datetime,
#                           `date_users_intervenant` datetime,
#                           `nb_rdvs_etu` int
#) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

CREATE TABLE `configs` (
                           `id_config` int unsigned NOT NULL AUTO_INCREMENT,
                           `key` varchar(255) NOT NULL,
                           `value` text,
                           PRIMARY KEY (`id_config`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

# Dump de la table evaluations
# ------------------------------------------------------------

DROP TABLE IF EXISTS `evaluations`;

CREATE TABLE `evaluations` (
                               `id_eval` int unsigned NOT NULL AUTO_INCREMENT,
                               `user_id` int unsigned NOT NULL,
                               `company_id` int unsigned NOT NULL,
                               `rem` text,
                               PRIMARY KEY (`id_eval`),
                               KEY `user_id` (`user_id`),
                               KEY `company_id` (`company_id`),
                               CONSTRAINT `evaluations_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id_user`),
                               CONSTRAINT `evaluations_ibfk_2` FOREIGN KEY (`company_id`) REFERENCES `companies` (`id_company`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

# Dump de la table formations
# ------------------------------------------------------------

DROP TABLE IF EXISTS `formations`;

CREATE TABLE `formations` (
                              `id_formation` int unsigned NOT NULL AUTO_INCREMENT,
                              `nom` varchar(255) NOT NULL,
                              `date_agenda` datetime,
                              PRIMARY KEY (`id_formation`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

# Dump de la table intervenants_users
# ------------------------------------------------------------

DROP TABLE IF EXISTS `intervenants_users`;

CREATE TABLE `intervenants_users` (
                                         `id_user` int unsigned NOT NULL AUTO_INCREMENT,
                                         `company_id` int unsigned NOT NULL,
                                         `title` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
                                         `password` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
                                         PRIMARY KEY (`id_user`),
                                         KEY `company_id` (`company_id`),
                                         CONSTRAINT `intervenants_users_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`),
                                         CONSTRAINT `intervenants_users_ibfk_2` FOREIGN KEY (`company_id`) REFERENCES `companies` (`id_company`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

# Dump de la table logs
# ------------------------------------------------------------

DROP TABLE IF EXISTS `logs`;

CREATE TABLE `logs` (
                        `id_log` bigint unsigned NOT NULL AUTO_INCREMENT,
                        `user_id` int unsigned NOT NULL,
                        `action_id` int unsigned NOT NULL,
                        `api` varchar(128) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
                        `action` varchar(128) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
                        `timestamp` timestamp NOT NULL ON UPDATE CURRENT_TIMESTAMP,
                        PRIMARY KEY (`id_log`),
                        KEY `user_id` (`user_id`),
                        CONSTRAINT `logs_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id_user`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

# Dump de la table offers
# ------------------------------------------------------------

DROP TABLE IF EXISTS `offers`;

CREATE TABLE `offers` (
                          `id_offer` int unsigned NOT NULL AUTO_INCREMENT,
                          `company_id` int unsigned NOT NULL,
                          `file` varchar(255) DEFAULT NULL,
                          `title` varchar(255) DEFAULT NULL,
                          `type` enum('stage','emploi') DEFAULT NULL,
                          PRIMARY KEY (`id_offer`),
                          KEY `company_id` (`company_id`),
                          CONSTRAINT `offers_ibfk_1` FOREIGN KEY (`company_id`) REFERENCES `companies` (`id_company`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

# Dump de la table participants_users
# ------------------------------------------------------------

DROP TABLE IF EXISTS `participants_users`;

CREATE TABLE `participants_users` (
                                         `id_user` int unsigned NOT NULL AUTO_INCREMENT,
                                         `cv_files` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
                                         `formation_id` int unsigned NOT NULL,
                                         PRIMARY KEY (`id_user`),
                                         CONSTRAINT `participants_users_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`),
                                         CONSTRAINT `participants_users_ibfk_2` FOREIGN KEY (`formation_id`) REFERENCES `formations` (`id_formation`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

# Dump de la table pictures
# ------------------------------------------------------------

DROP TABLE IF EXISTS `pictures`;

CREATE TABLE `pictures` (
                            `id_picture` int unsigned NOT NULL AUTO_INCREMENT,
                            `company_id` int unsigned NOT NULL,
                            `href` varchar(255) DEFAULT NULL,
                            `alt` varchar(128) DEFAULT NULL,
                            PRIMARY KEY (`id_picture`),
                            KEY `company_id` (`company_id`),
                            CONSTRAINT `pictures_ibfk_1` FOREIGN KEY (`company_id`) REFERENCES `companies` (`id_company`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

# Dump de la table questions
# ------------------------------------------------------------

DROP TABLE IF EXISTS `questions`;

CREATE TABLE `questions` (
                             `id_questions` int unsigned NOT NULL AUTO_INCREMENT,
                             `question` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
                             PRIMARY KEY (`id_questions`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

# Dump de la table questions_evaluations
# ------------------------------------------------------------

DROP TABLE IF EXISTS `questions_evaluations`;

CREATE TABLE `questions_evaluations` (
                                         `id_question_eval` int unsigned NOT NULL AUTO_INCREMENT,
                                         `eval_id` int unsigned NOT NULL,
                                         `question_id` int unsigned NOT NULL,
                                         `grade` enum('insuffisant','passable', 'bien', 'très bien') DEFAULT NULL,
                                         PRIMARY KEY (`id_question_eval`),
                                         KEY `eval_id` (`eval_id`),
                                         KEY `question_id` (`question_id`),
                                         CONSTRAINT `questions_evaluations_ibfk_1` FOREIGN KEY (`eval_id`) REFERENCES `evaluations` (`id_eval`),
                                         CONSTRAINT `questions_evaluations_ibfk_2` FOREIGN KEY (`question_id`) REFERENCES `questions` (`id_questions`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

# Dump de la table rdvs
# ------------------------------------------------------------

DROP TABLE IF EXISTS `rdvs`;

CREATE TABLE `rdvs` (
                        `id_rdv` int unsigned NOT NULL AUTO_INCREMENT,
                        `user_id` int unsigned NOT NULL,
                        `slot_id` int unsigned NOT NULL,
                        PRIMARY KEY (`id_rdv`),
                        KEY `user_id` (`user_id`),
                        KEY `slot_id` (`slot_id`),
                        CONSTRAINT `rdv_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id_user`),
                        CONSTRAINT `rdv_ibfk_3` FOREIGN KEY (`slot_id`) REFERENCES `slots` (`id_slot`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

# Dump de la table secteurs_activites
# ------------------------------------------------------------

DROP TABLE IF EXISTS `secteurs_activites`;

CREATE TABLE `secteurs_activites` (
                                      `id_secteurs_activites` int unsigned NOT NULL AUTO_INCREMENT,
                                      `name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
                                      PRIMARY KEY (`id_secteurs_activites`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

# Dump de la table sections
# ------------------------------------------------------------

DROP TABLE IF EXISTS `sections`;

CREATE TABLE `sections` (
                            `id_section` int unsigned NOT NULL AUTO_INCREMENT,
                            `company_id` int unsigned NOT NULL,
                            `picture_id` int unsigned NOT NULL,
                            `text` text,
                            PRIMARY KEY (`id_section`),
                            KEY `picture_id` (`picture_id`),
                            KEY `company_id` (`company_id`),
                            CONSTRAINT `sections_ibfk_1` FOREIGN KEY (`picture_id`) REFERENCES `pictures` (`id_picture`),
                            CONSTRAINT `sections_ibfk_2` FOREIGN KEY (`company_id`) REFERENCES `companies` (`id_company`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

# Dump de la table slots
# ------------------------------------------------------------

DROP TABLE IF EXISTS `slots`;

CREATE TABLE `slots` (
                         `id_slot` int unsigned NOT NULL AUTO_INCREMENT,
                         `company_id` int unsigned NOT NULL,
                         `start` datetime NOT NULL,
                         `duration` tinyint NOT NULL DEFAULT '20',
                         PRIMARY KEY (`id_slot`),
                         KEY `company_id` (`company_id`),
                         CONSTRAINT `slots_ibfk_1` FOREIGN KEY (`company_id`) REFERENCES `companies` (`id_company`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

# Dump de la table tags
# ------------------------------------------------------------

DROP TABLE IF EXISTS `tags`;

CREATE TABLE `tags` (
                        `id_tag` int unsigned NOT NULL AUTO_INCREMENT,
                        `tagname` varchar(128) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
                        PRIMARY KEY (`id_tag`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

# Dump de la table users
# ------------------------------------------------------------

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
                         `id_user` int unsigned NOT NULL AUTO_INCREMENT,
                         `username` varchar(128) NOT NULL,
                         `type` enum('intervenant','participant','admin') NOT NULL,
                         `cgu` enum('oui', 'non') NOT NULL,
                         `picture` varchar(255) DEFAULT NULL,
                         `phone` varchar(16) DEFAULT NULL,
                         `name` varchar(128) DEFAULT NULL,
                         `firstname` varchar(128) DEFAULT NULL,
                         `mail` varchar(319) DEFAULT NULL,
                         PRIMARY KEY (`id_user`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;