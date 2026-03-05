<?php
/**
 * Upgrades Handler.
 *
 * @author     ThemeFusion
 * @copyright  (c) Copyright by ThemeFusion
 * @link       https://avada.com
 * @package    Avada
 * @subpackage Core
 */

// Do not allow directly accessing this file.
if ( ! defined( 'ABSPATH' ) ) {
	exit( 'Direct script access denied.' );
}

/**
 * Handle migrations for Avada 7.15.0
 *
 * @since 7.15.0
 */
class Avada_Upgrade_7143 extends Avada_Upgrade_Abstract {

	/**
	 * The version.
	 *
	 * @access protected
	 * @since 7.15.0
	 * @var string
	 */
	protected $version = '7.15.0';

	/**
	 * An array of all available languages.
	 *
	 * @static
	 * @access private
	 * @since 7.15.0
	 * @var array
	 */
	private static $available_languages = [];

	/**
	 * The actual migration process.
	 *
	 * @access protected
	 * @since 7.15.0
	 * @return void
	 */
	protected function migration_process() {
		$available_languages       = Fusion_Multilingual::get_available_languages();
		self::$available_languages = ( ! empty( $available_languages ) ) ? $available_languages : [ '' ];

		$this->migrate_options();
	}

	/**
	 * Migrate options.
	 *
	 * @since 7.15.0
	 * @access protected
	 */
	protected function migrate_options() {
		$available_langs = self::$available_languages;

		$options = get_option( $this->option_name, [] );
		$options = $this->update_rendering_logic_binding( $options );
		$options = $this->update_custom_css_woo_filter_sorting( $options );

		update_option( $this->option_name, $options );

		foreach ( $available_langs as $language ) {

			// Skip langs that are already done.
			if ( '' === $language ) {
				continue;
			}

			$options = get_option( $this->option_name . '_' . $language, [] );
			$options = $this->update_rendering_logic_binding( $options );
			$options = $this->update_custom_css_woo_filter_sorting( $options );

			update_option( $this->option_name . '_' . $language, $options );
		}

		$this->update_form_submissions_table();
	}

	/**
	 * Update rendering logic binding option to "op_change".
	 *
	 * @access private
	 * @since 7.15.0
	 * @param array $options The Global Options array.
	 * @return array         The updated Global Options array.
	 */
	private function update_rendering_logic_binding( $options ) {
		$options['rendering_logic_binding'] = 'op_change';

		return $options;
	}

	/**
	 * Update custom CSS to include old Woo filter and sorting element styles.
	 *
	 * @access private
	 * @since 7.15.0
	 * @param array $options The Global Options array.
	 * @return array         The updated Global Options array.
	 */
	private function update_custom_css_woo_filter_sorting( $options ) {
		// Woo Price Filter element.
		$options['custom_css'] .= '.fusion-body .price_slider_wrapper .price_slider_amount .button { padding: 0.5em 0.7em; }';

		// Woo Sorting element.
		$options['custom_css'] .= '.fusion-body .fusion-woo-sorting .sort-count > li .current-li, .fusion-body .fusion-woo-sorting .sort-count > li li, .fusion-woo-sorting .awb-product-view li { background-color: var(--awb-dropdown-bg-color,var(--woo_dropdown_bg_color)); }';
		$options['custom_css'] .= '.fusion-body .fusion-woo-sorting .sort-count > li li.active-count, .fusion-body .fusion-woo-sorting .sort-count > li li:hover { background-color: var(--woo_dropdown_bg_color); }';

		return $options;
	}

	/**
	 * Adds device_type column to the Avada Forms submissions tabel.
	 *
	 * @access private
	 * @since 7.15.0
	 * @return void
	 */
	private function update_form_submissions_table() {
		global $wpdb;

		$table_name  = $wpdb->prefix . 'fusion_form_submissions';
		$column_name = 'device_type';

		$table_exists = (bool) $wpdb->get_var(
			$wpdb->prepare(
				'SHOW TABLES LIKE %s',
				$table_name
			)
		);

		if ( $table_exists ) {		
			$column_exists = $wpdb->get_var(
				$wpdb->prepare(
					"
					SELECT COUNT(*)
					FROM INFORMATION_SCHEMA.COLUMNS
					WHERE table_schema = %s
					AND table_name = %s
					AND column_name = %s
					",
					DB_NAME,
					$table_name,
					$column_name
				)
			);

			if ( ! $column_exists ) {
				$wpdb->query(
					"ALTER TABLE $table_name ADD COLUMN $column_name VARCHAR(32) NULL"
				);
			}
		}
	}
}
